CREATE DATABASE todo_projectbd;
USE todo_projectbd;

CREATE TABLE lists(
	id_list INT(100) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `date` VARCHAR(15) NOT NULL,
    `time` VARCHAR(5),
	`description` VARCHAR(80)
);