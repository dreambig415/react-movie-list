export function makeSearchString(values) {
    let searchString = '';
    for (let [key, val] of Object.entries(values)) {
        if (!val) {
            continue;
        } 
        switch (key) {
            case 'title':
                searchString += `&s=${val}`;
                break;
            case 'year':
                searchString += `&y=${val}`;
                break;
            case 'type':
                searchString += `&type=${val}`;
                break;
            default:
                break;
        }
    }
    return searchString;
}