export function getHTMLRegistrationLetter(login: string, link: string): string {
    return `<div>Привет, <b>${login}</b></div>
            <div>Для подтверждения перейдите по этой 
                <b><a href="${link}" target="_blank">ссылке</a></b>
            </div>`;
}
