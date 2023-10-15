const icons = {
    wedding: "mdi-ring",
    residency: "mdi-city",
    function: "mdi-office-building"
}

export function renderIcon(gigType) {
    if (gigType === 'Wedding') return icons.wedding
    if (gigType === 'Function') return icons.function
    if (gigType === 'Residency') return icons.residency
}