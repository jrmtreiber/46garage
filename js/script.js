// Interação com Imagem e Áudio
const imagem = document.getElementById('imagem');
const audio = document.getElementById('audio');

imagem.addEventListener('click', function () {
    audio.play();
});

imagem.addEventListener('mouseup', function () {
    audio.pause();
    audio.currentTime = 0;
});

imagem.addEventListener('mouseleave', function () {
    audio.pause();
    audio.currentTime = 0;
});

// Envio de Mensagem via Webhook do Discord
const webhookUrl = "https://discord.com/api/webhooks/1298829582195097693/7j_DaVgGXSL00830vm_NR1cwUfamf6OYEXm0jpyj3WWoahu7mH7f_HfbuMX4JHuoOd8J";

document.getElementById("messageForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const content = document.getElementById("content").value;

    const payload = {
        content: `> - **Nome:** ${name}\n> - **Contato:** ${telefone}\n> - **E-mail:** ${email}\n> - **Mensagem:**\n\`\`\`${content}\`\`\``
    };

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById("messageForm").reset();
        } else {
            alert("Erro ao enviar a mensagem.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao enviar a mensagem.");
    }
});

const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');

    if (valor.length > 11) valor = valor.slice(0, 11);

    let formato;
    if (valor.length <= 10) {
        formato = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        formato = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    e.target.value = formato;
});

//INDEX
function updateVideos() {
    const videosToRemove = document.querySelectorAll('.video-remove');
    const videosContainer = document.body;

    if (window.innerWidth <= 1300) {
        window.reload();
        videosToRemove.forEach(video => {
            if (!video.classList.contains('removed')) {
                video.classList.add('removed');
                video.remove(); 
            }
        });
    } else {
        videosToRemove.forEach(video => {
            if (video.classList.contains('removed')) {
                const newVideo = document.createElement('video');
                newVideo.src = video.src;
                newVideo.controls = true;
                videosContainer.appendChild(newVideo); 
                video.classList.remove('removed'); 
            }
        });
    }
}

updateVideos();
window.addEventListener('resize', updateVideos);
