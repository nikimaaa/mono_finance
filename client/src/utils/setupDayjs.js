import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import updateLocale from "dayjs/plugin/updateLocale.js";


const setupDayjs = () => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    dayjs.updateLocale('ru', {
        relativeTime: {
            future: "в %s",
            past: "%s назад",
            s: 'несколько секунд',
            m: "минута",
            mm: "%d минут",
            h: "час",
            hh: "%d часов",
            d: "день",
            dd: "%d дней",
            M: "месяц",
            MM: "%d месяцов",
            y: "год",
            yy: "%d лет"
        }
    })
}

export default setupDayjs