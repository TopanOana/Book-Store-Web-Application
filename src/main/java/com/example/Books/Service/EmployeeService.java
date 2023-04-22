package com.example.Books.Service;

import com.example.Books.Model.Employee;
import com.example.Books.Model.Store;
import com.example.Books.Repository.EmployeeRepository;
import com.example.Books.Validation.ValidatorEmployee;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;


    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository=employeeRepository;
    }
    public Page<Employee> getAllEmployees(int page, int size){
        /*
        returns all the employees in the repository
         */
        PageRequest pageRequest = PageRequest.of(page, size);
        return employeeRepository.findAllOrderById(pageRequest);
//        return employeeRepository.findAll().stream().collect(Collectors.toList());
    }

    public Employee addEmployeeToRepository(Employee newEmployee){
        ValidatorEmployee validatorEmployee = new ValidatorEmployee();
        validatorEmployee.validate(newEmployee);
        return employeeRepository.save(newEmployee);
    }

    public Employee getStoreIDByEmployeeID(Long id){
        /*
        gets an employee by id
         */
        return employeeRepository.findById(id).get();
    }

    public Employee updateEmployeeInRepository(Long id, Employee updatedEmployee)
    {
        ValidatorEmployee validatorEmployee = new ValidatorEmployee();
        validatorEmployee.validate(updatedEmployee);
        return employeeRepository.findById(id).map(employee -> {
            employee.setFirstName(updatedEmployee.getFirstName());
            employee.setLastName(updatedEmployee.getLastName());
            employee.setPhoneNumber(updatedEmployee.getPhoneNumber());
            employee.setSalary(updatedEmployee.getSalary());
            employee.setFullTime(updatedEmployee.isFullTime());
            employee.setStore(updatedEmployee.getStore());
            employee.setDescription(updatedEmployee.getDescription());
            return employeeRepository.save(employee);
                }).orElseGet(()->{
                    updatedEmployee.setId(id);
                    return employeeRepository.save(updatedEmployee);
        });
    }

    public void deleteEmployeeInRepository(Long id){
        employeeRepository.deleteById(id);
    }


    public Employee getEmployeeByID(Long id){
        return this.employeeRepository.findById(id).get();
    }


    public Page<Employee> getSortedBy(int page, int size, String column, String order){
        PageRequest pageRequest = PageRequest.of(page, size);
        switch (column) {
            case "firstName" -> {
                if (order.equals("asc"))
                    return employeeRepository.findByOrderByFirstNameAsc(pageRequest);
                else return employeeRepository.findByOrderByFirstNameDesc(pageRequest);
            }
            case "lastName" -> {
                if (order.equals("asc"))
                    return employeeRepository.findByOrderByLastNameAsc(pageRequest);
                else return employeeRepository.findByOrderByLastNameDesc(pageRequest);
            }
            case "salary" -> {
                if (order.equals("asc"))
                    return employeeRepository.findByOrderBySalaryAsc(pageRequest);
                else return employeeRepository.findByOrderBySalaryDesc(pageRequest);
            }
            default -> {
                return null;
            }
        }
    }

}
