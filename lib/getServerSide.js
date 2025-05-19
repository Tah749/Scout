// Create an array holding any props that will be added
const props = {}

export function makeServerSideProps(element, value) {
    // Add the element and its value to the props array
    props[element] = value;
    // return the props array
    return props
}


