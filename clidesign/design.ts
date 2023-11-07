import chalk from "chalk"
import chalkAnimation from "chalk-animation"


const sleep = () => {
    return new Promise ((res)=>{
        setTimeout(res,2000)
    })
}

async function Welcome() {
    let universityTitle = chalkAnimation.neon('UNIVERSITY MANAGEMENT SYSTEM')
    await sleep();
    universityTitle.stop();

    
    console.log(chalk.cyanBright(`
    ██▄ ██ █▄█ ██ █╬ ███ ███ ╬╬ ██▄ █╬█ ╬╬ ██ ███ ███ ██▄ ██ ██ █╬╬█
    █╬█ █▄ ███ █▄ █╬ █╬█ █▄█ ╬╬ █▄█ █▄█ ╬╬ █▄ █▄█ █▄╬ █╬█ █▄ █▄ ██▄█
    ███ █▄ ╬█╬ █▄ ██ █▄█ █╬╬ ╬╬ █▄█ ╬█╬ ╬╬ █╬ █╬█ █╬█ ███ █▄ █▄ █╬██`))
}

export default Welcome