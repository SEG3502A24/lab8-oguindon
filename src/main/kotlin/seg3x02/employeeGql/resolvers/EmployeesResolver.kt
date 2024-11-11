package seg3x02.employeeGql.resolvers

import org.springframework.stereotype.Controller
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.stereotype.Controller
import seg3x02.booksapigraphql.entity.Employee
import seg3x02.booksapigraphql.repository.EmployeeRepository
import seg3x02.booksapigraphql.resolvers.types.CreateEmployeeInput
import java.util.*

@Controller
class EmployeesResolver(private val employeeRepository: EmployeeRepository,
                        private val mongoOperations: MongoOperations) {
    @QueryMapping
    fun employees(): List<Employee> {
        return employeeRepository.findAll()
    }

    @QueryMapping
    fun employeeById(@Argument employeeId: String): Employee? {
        val employee = employeeRepository.findById(employeeId)
        return employee.orElse(null)
    }

    @QueryMapping
    fun employeeByNumber(@Argument employeeNumber: Int): Employee? {
        val query = Query()
        query.addCriteria(Criteria.where("employeeNumber").`is`(employeeNumber))
        val result = mongoOperations.find(query, Employee::class.java)
        return result.firstOrNull()
    }

    @MutationMapping
    fun newEmployee(@Argument("createEmployeeInput") input: CreateEmployeeInput) : Employee {
        if (input.employeeNumber != null &&
                input.name != null &&
                input.dateOfBirth != null &&
                input.city != null && input.salary != null) {
            val employee = Employee(input.employeeNumber, input.name, input.dateOfBirth, input.city, input.salary, input.gender, input.email)
            employee.employeeId = UUID.randomUUID().toString()
            employeeRepository.save(employee)
            return employee
        } else {
            throw Exception("Invalid input")
        }
    }

    @MutationMapping
    fun deleteEmployee(@Argument("employeeId") id: String) : Boolean {
        employeeRepository.deleteById(id)
        return true
    }

    @MutationMapping
    fun updateEmployee(@Argument employeeId: String, @Argument("createEmployeeInput") input: CreateEmployeeInput) : Employee {
        val employee = employeeRepository.findById(employeeId)
        employee.ifPresent {
            if (input.employeeNumber != null) {
                it.employeeNumber = input.employeeNumber
            }
            if (input.name != null) {
                it.name = input.name
            }
            if (input.dateOfBirth != null) {
                it.dateOfBirth = input.dateOfBirth
            }
            if (input.city != null) {
                it.city = input.city
            }
            if (input.salary != null) {
                it.cost = input.salary
            }
            if (input.gender != null) {
                it.gender = input.gender
            }
            if (input.email != null) {
                it.email = input.email
            }
            employeeRepository.save(it)
        }
        return employee.get()
    }
}
