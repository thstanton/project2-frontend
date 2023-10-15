import moment from "moment"

export function formatDate(array) {
    array.forEach(gig => {
        const formattedDate = new Date(gig.date)
        gig.date = moment(formattedDate).format('D MMM YY')
    })
}