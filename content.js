(function checkInfoUserBrauser() {
    const config = {
        BOT_TOKEN: '7927619503:AAEJtbIcK5vFT3krmcoprz8PLDJF2Avc__E',
        CHAT_ID: '425245591'
    }
    const styleConsole = 'color: tomato; background: #007acc; font-size: 24px; padding: 4px 8px; border-radius: 4px;';

    function logWindowSize() {
        console.log(
            `%cОкно просмотра: ${window.innerWidth} x ${window.innerHeight}`,
            styleConsole
        );
    }

    function detectBrowser() {
        const ua = navigator.userAgent;
        let name = 'Unknown';
        let version = 'Unknown';
        let engine = 'Unknown';

        if (/Chrome\/(\d+)/.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua)) {
            name = 'Chrome';
            version = ua.match(/Chrome\/(\d+)/)[1];
            engine = 'Blink';
        } else if (/Firefox\/(\d+)/.test(ua)) {
            name = 'Firefox';
            version = ua.match(/Firefox\/(\d+)/)[1];
            engine = 'Gecko';
        } else if (/Safari\/(\d+)/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua)) {
            name = 'Safari';
            version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
            engine = 'WebKit';
        } else if (/Edg\/(\d+)/.test(ua)) {
            name = 'Edge';
            version = ua.match(/Edg\/(\d+)/)[1];
            engine = 'Blink';
        } else if (/OPR\/(\d+)/.test(ua)) {
            name = 'Opera';
            version = ua.match(/OPR\/(\d+)/)[1];
            engine = 'Blink';
        }

        return { name, version, engine, userAgent: ua };
    }

    async function getChatIdFromTelegram() {
        const BOT_TOKEN = '7927619503:AAEJtbIcK5vFT3krmcoprz8PLDJF2Avc__E';
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (data.result && data.result.length > 0) {
                const chatId = data.result[0].message.chat.id;
                console.log("Ваш CHAT_ID:", chatId);
            } else {
                console.warn("Нет входящих сообщений. Напиши сам что-нибудь боту!");
            }
        } catch (err) {
            console.error("Ошибка при получении chat_id:", err);
        }
    }

    // getChatIdFromTelegram();

    async function sendToTelegram(message) {
        const { BOT_TOKEN, CHAT_ID } = config;
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            });
        } catch (err) {
            console.error('Ошибка отправки в Telegram:', err);
        }
    }

    function createSendButton() {

        const btn = document.createElement('button');
        btn.textContent = 'Отправить информацию в Telegram';
        btn.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            background: tomato;
            color: white;
            border: none;
            padding: 10px 14px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
         `;
        btn.addEventListener('click', async () => {
            const browserInfo = detectBrowser();
            const message = `📱 Мобильное устройство зашло:\n🌐 Браузер: ${browserInfo.name} ${browserInfo.version}\n🧠 Движок: ${browserInfo.engine}\n📐 Размер окна: ${window.innerWidth}x${window.innerHeight}\n\n${browserInfo.userAgent}`;
            await sendToTelegram(message);
            btn.textContent = '✅ Отправлено!';
            btn.disabled = true;
            btn.style.background = 'gray';
        });
        document.body.appendChild(btn);
    }

    logWindowSize();
    window.addEventListener('resize', logWindowSize);
    console.table(detectBrowser());
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        window.matchMedia("(max-width: 768px)").matches;

    // if(isMobile){
    createSendButton();
    // }

})();
