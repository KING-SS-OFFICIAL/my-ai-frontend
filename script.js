const chat = document.getElementById("chat");

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "message " + type;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function send() {
    const input = document.getElementById("input");
    const message = input.value;

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    addMessage("Typing...", "bot");

    try {
        const res = await fetch("https://my-ai-website-4xnh.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        chat.lastChild.remove();
        addMessage(data.reply || "No reply from AI", "bot");

    } catch (error) {
        chat.lastChild.remove();
        addMessage("Error: " + error.message, "bot");
        console.error(error);
    }
}
