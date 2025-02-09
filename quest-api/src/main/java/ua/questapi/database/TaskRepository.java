package ua.questapi.database;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.questapi.database.entity.TaskEntity;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {}
