export class ConvertHour{

    public static convertHour( hourSelected: string ): string{
        const [hour, minutes] = hourSelected.split(":").map(Number);
        const ampm = hour >= 12 ? "PM": "AM";
        const hourFormat = hour % 12 === 0 ? 12 : hour % 12;
        return `${hourFormat.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }


    public static convertHourBack(hour12: string): string {
        const [time, modifier] = hour12.split(" "); // "03:45 PM" → ["03:45", "PM"]
        let [hour, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hour !== 12) {
            hour += 12;
        }

        if (modifier === "AM" && hour === 12) {
            hour = 0;
        }

        return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

}
