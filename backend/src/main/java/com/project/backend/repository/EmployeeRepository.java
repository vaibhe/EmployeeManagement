package com.project.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	Employee findByEmpcity(String emp_city);

	Optional<List<Employee>> findByEmpageGreaterThan(int emp_age);

}