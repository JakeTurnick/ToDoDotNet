export default function HomePage() {
    // testing funs
    function logNum(num) {
        console.log(num)
    }
    window.logCurrentToDo = logNum;

    return (
        <main>
            <h1>Home page</h1>
        </main>
    )
}