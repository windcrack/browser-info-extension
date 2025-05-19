(function checkInfoUserBrauser() {
    const config = {
        BOT_TOKEN: '7927619503:AAEJtbIcK5vFT3krmcoprz8PLDJF2Avc__E',
        CHAT_ID: '425245591'
    }
    const styleConsole = 'color: tomato; background: #007acc; font-size: 24px; padding: 4px 8px; border-radius: 4px;';
    const buttonStyle = `
            background: tomato;
            color: white;
            border: none;
            padding: 10px 14px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            font-family: inherit;
         `;
    const btnShowStyle = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            padding: 10px;
            background-color: #fff;
            border-radius: 100%;
            background-image: url('data:image/svg+xml,%3Csvg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M7 8L3 12L7 16" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M17 8L21 12L17 16" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M14 4L9.8589 19.4548" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
            background-position: center;
            background-repeat: no-repeat;
            border: 1px solid black;
            cursor: pointer;
    `;
    const btnHideStyle = `
            width: 40px;
            height: 40px;
            padding: 10px;
            background-color: #fff;
            border-radius: 100%;
            background-image: url('data:image/svg+xml,%3Csvg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M9 6L15 12L9 18" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
            background-position: center;
            background-repeat: no-repeat;
            border: 1px solid black;
            cursor: pointer;
    `;
    const blockInfoStyle = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px;
            z-index: 9999;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            font-size: 16px;
            border-radius: 8px;
            display: none;
            flex-flow: column;
            gap: 10px;
            font-family: inherit;
        `;
    //display: flex;
    function logWindowSize() {
        console.log(
            `%cОкно просмотра: ${window.innerWidth} x ${window.innerHeight}`,
            styleConsole
        );
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        }
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
        btn.style = buttonStyle;
        btn.addEventListener('click', async () => {
            const browserInfo = detectBrowser();
            const message = `📱 Мобильное устройство зашло:\n🌐 Браузер: ${browserInfo.name} ${browserInfo.version}\n🧠 Движок: ${browserInfo.engine}\n📐 Размер окна: ${window.innerWidth}x${window.innerHeight}\n\n${browserInfo.userAgent}`;
            await sendToTelegram(message);
            btn.textContent = '✅ Отправлено!';
            btn.disabled = true;
            btn.style.background = 'gray';
        });

        return btn
    }

    function createHideButton(){
        const btn = document.createElement('button');
        btn.style = btnHideStyle;
        btn.addEventListener('click', async () => {
            document.querySelector('.blockInfoClassDevade').style.display = 'none';
        });

        return btn
    }

    function addPanelInfo(){
        const blockInfo = document.createElement('div');
        // const styleTd = 'border: 1px solid black; border-radius: 10px; padding: 10px'
        blockInfo.classList.add('blockInfoClassDevade');
        blockInfo.style = blockInfoStyle;
        const browserInfo = detectBrowser();
        blockInfo.innerHTML = `
            
             <div style="color: #fff; 
                         background: #007acc; 
                         font-size: 24px; 
                         padding: 4px 8px; 
                         border-radius: 4px;">
                Область видимости: ${logWindowSize().width} х ${logWindowSize().height}
             </div>
             <table style="width: 100%">
                <thead>
                    <tr>
                        <td style='border: 1px solid black; border-radius: 10px; padding: 10px'>Браузер</td>
                        <td style='border: 1px solid black; border-radius: 10px; padding: 10px'>Движок</td>
                        <td style='border: 1px solid black; border-radius: 10px; padding: 10px'>Версия</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='border: 1px solid black; border-radius: 10px; padding: 10px'>${browserInfo.name}</td>
                        <td style='border: 1px solid black; border-radius: 10px; padding: 10px'>${browserInfo.engine}</td>
                        <td style='border: 1px solid black; border-radius: 10px; padding: 10px'>${browserInfo.version}</td>
                    </tr>
                </tbody>
             </table>
            `;
        const theFirstChild = blockInfo.firstChild;
        blockInfo.insertBefore(createHideButton(), theFirstChild);
        blockInfo.append(createSendButton());
        document.body.appendChild(blockInfo);
    }

    function createShoPanelBtn(){
        const btnShow = document.createElement('button');
        btnShow.style = btnShowStyle;
        btnShow.addEventListener('click', () =>{
            document.querySelector('.blockInfoClassDevade').style.display = 'flex';
        })
        document.body.appendChild(btnShow);
    }

    logWindowSize();
    window.addEventListener('resize', logWindowSize);
    console.table(detectBrowser());
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        window.matchMedia("(max-width: 768px)").matches;

    // if(isMobile){
    addPanelInfo();
    createShoPanelBtn();
    // }

})();
