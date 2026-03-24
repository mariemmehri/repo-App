package com.example.todo;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final List<Todo> todos = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    public TodoController() {
        todos.add(new Todo(counter.incrementAndGet(), "Apprendre Docker", false));
        todos.add(new Todo(counter.incrementAndGet(), "Conteneuriser l'app", false));
        todos.add(new Todo(counter.incrementAndGet(), "Déployer sur Kubernetes", false));
    }

    @GetMapping
    public List<Todo> getAll() {
        return todos;
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        todo.setId(counter.incrementAndGet());
        todos.add(todo);
        return todo;
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo updated) {
        for (Todo todo : todos) {
            if (todo.getId().equals(id)) {
                todo.setCompleted(updated.isCompleted());
                return todo;
            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        todos.removeIf(todo -> todo.getId().equals(id));
    }
}
