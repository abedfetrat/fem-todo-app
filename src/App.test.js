import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { STORAGE_KEY } from "./providers/TodosProvider";

jest.mock("./hooks/useMediaQuery", () => {
    return ((query) => query === "(max-width: 767px)" ? false : true);
});

beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
});

function setupFakeTodos(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data ? data : [
        {
            id: "1",
            text: "my first todo",
            completed: false
        },
        {
            id: "2",
            text: "my second todo",
            completed: false
        },
    ]));
}

test("renders todo items from storage", () => {
    setupFakeTodos();

    const { getByText } = render(<App />);

    const firstTodo = getByText("my first todo");
    const secondTodo = getByText("my second todo");

    expect(firstTodo).toBeInTheDocument();
    expect(secondTodo).toBeInTheDocument();
});

test("adding a new todo renders it to the list", async () => {
    const { getByRole, getAllByRole } = render(<App />)

    const todoText = "something todo";
    const todoInput = getByRole("textbox");

    await userEvent.type(todoInput, todoText);
    await userEvent.keyboard("{Enter}");

    const todoItems = getAllByRole("listitem");

    expect(todoItems).toHaveLength(1);
    expect(todoItems[0]).toHaveTextContent(todoText);
});

test("clicking on a un-completed todo renders it as completed", async () => {
    setupFakeTodos();

    const { getAllByRole } = render(<App />)

    const todoItems = getAllByRole("listitem");
    const firstTodoCheck = within(todoItems[0]).getByRole("checkbox");
    const secondTodoCheck = within(todoItems[1]).getByRole("checkbox");

    await userEvent.click(firstTodoCheck);

    expect(firstTodoCheck).toBeChecked();
    expect(secondTodoCheck).not.toBeChecked();
});


test("clicking on a completed todo renders it as un-completed", async () => {
    setupFakeTodos([
        {
            id: "1",
            text: "my first todo",
            completed: false
        },
        {
            id: "2",
            text: "my second todo",
            completed: true
        },
    ]);

    const { getAllByRole } = render(<App />)

    const todoItems = getAllByRole("listitem");
    const firstTodoCheck = within(todoItems[0]).getByRole("checkbox");
    const secondTodoCheck = within(todoItems[1]).getByRole("checkbox");

    expect(firstTodoCheck).not.toBeChecked();
    expect(secondTodoCheck).toBeChecked();

    await userEvent.click(secondTodoCheck);

    expect(firstTodoCheck).not.toBeChecked();
    expect(secondTodoCheck).not.toBeChecked();
});


test("clicking delete on a todo removes it from the list", async () => {
    setupFakeTodos();

    const { getAllByRole } = render(<App />)

    const todoItems = getAllByRole("listitem");
    const firstTodoDelete = within(todoItems[0]).getByRole("button");

    await userEvent.click(firstTodoDelete);

    expect(todoItems[0]).not.toBeInTheDocument();
    expect(todoItems[1]).toBeInTheDocument();
});

test("clicking clear completed removes completed todos from the list", async () => {
    setupFakeTodos([
        {
            id: "1",
            text: "my first todo",
            completed: true
        },
        {
            id: "2",
            text: "my second todo",
            completed: false
        },
        {
            id: "3",
            text: "my third todo",
            completed: true
        },
    ]);

    const { getAllByRole, getByText } = render(<App />)

    const todoItems = getAllByRole("listitem");
    const clear = getByText("Clear completed");

    await userEvent.click(clear);

    expect(todoItems[0]).not.toBeInTheDocument();
    expect(todoItems[2]).not.toBeInTheDocument();
});

test("changing filter should render todos that match the selected filter", async () => {
    setupFakeTodos([
        {
            id: "1",
            text: "my first todo",
            completed: false
        },
        {
            id: "2",
            text: "my second todo",
            completed: true
        },
        {
            id: "3",
            text: "my third todo",
            completed: true
        },
    ]);

    const { getByRole, queryByText } = render(<App />)

    const allFilterBtn = getByRole("button", { name: /all/i });
    const activeFilterBtn = getByRole("button", { name: /active/i });
    const completedFilterBtn = getByRole("button", { name: /^completed$/i });

    const firstTodo = "my first todo";
    const secondTodo = "my second todo";
    const thirdTodo = "my third todo";

    // Filter by all todos
    await userEvent.click(allFilterBtn);

    expect(queryByText(firstTodo)).toBeInTheDocument();
    expect(queryByText(secondTodo)).toBeInTheDocument();
    expect(queryByText(thirdTodo)).toBeInTheDocument();

    // Filter by active todos
    await userEvent.click(activeFilterBtn);

    expect(queryByText(firstTodo)).toBeInTheDocument();
    expect(queryByText(secondTodo)).not.toBeInTheDocument();
    expect(queryByText(thirdTodo)).not.toBeInTheDocument();

    // Filter by completed todos
    await userEvent.click(completedFilterBtn);

    expect(queryByText(firstTodo)).not.toBeInTheDocument();
    expect(queryByText(secondTodo)).toBeInTheDocument();
    expect(queryByText(thirdTodo)).toBeInTheDocument();
});

test("un-completed todos count should render correct count", async () => {
    setupFakeTodos([
        {
            id: "1",
            text: "my first todo",
            completed: false
        },
        {
            id: "2",
            text: "my second todo",
            completed: false
        },
    ]);

    const { getAllByRole, getByText } = render(<App />)

    const countText = getByText(/items left/i);
    const todoItems = getAllByRole("listitem");
    const firstTodoCheck = within(todoItems[0]).getByRole("checkbox");

    expect(countText).toHaveTextContent("2 items left");

    await userEvent.click(firstTodoCheck);

    expect(countText).toHaveTextContent("1 items left");
}); 
