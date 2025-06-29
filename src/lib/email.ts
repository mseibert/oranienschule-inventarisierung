interface EmailBody {
    from: string
    to: string
    subject: string
    text: string
}

export async function sendEmail(body: EmailBody) {
    // update this with a hook
    return await fetch('https://api.resend.com/emails', {
        method: 'POST',
        body: JSON.stringify({
            from: body.from,
            to: body.to.split(','),
            subject: body.subject,
            text: body.text,
        }),
    })
}