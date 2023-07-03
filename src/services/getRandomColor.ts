export const getRandomColor = (colors: string[]) => {
    // TODO:use colors that have already been defined inside of the Theme context of the app
    // const colors = ['#157B80', '#32AC71', '#1D6CA7', '#ECA235'];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
