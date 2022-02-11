const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "https://cdn.discordapp.com/attachments/901304253677711450/928427537279905792/welcome_image2.png"

const dim = {
    height: 670,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    //draw in the background
    const backing = await Canvas.loadImage(background)
    ctx.drawImage(backing, 0, 0)

    //draw black tinted box
    //ctx.fillStyle = "rgba(0,0,0,0.8)"
    //ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, ///dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    // write in tex
    ctx.fillStyle = "black"
    ctx.textAlign = "center"

    // draw in welcom
    ctx.font = "50px Kalam"
    ctx.fillText("WelCUM", dim.width/2, dim.margin + 70)

    // draw in the username
    ctx.font = "60px Kalam"
    ctx.fillText(username + "#" + discrim, dim.width/2, dim.height - dim.margin -125)

    // draw in to the server
    ctx.font = "40px Kalam"
    ctx.fillText("to the server", dim.width/2, dim.height - dim.margin - 50)

    const attachement = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachement
}

module.exports = generateImage