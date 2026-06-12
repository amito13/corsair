import { corsair } from './corsair.ts'
import "dotenv/config" 

const main = async () => {
    
    const res = await corsair.withTenant("integration").gmail.api.threads.list({})
    const res1 = await corsair.withTenant("integration").googlecalendar.api.events.getMany({})
    // console.log(res)
    console.log(res1)
};
main();