# Text Component :cupid:
This is a reusable react native component that renders text with a Poppins and Inter font family and in specific sizes tailored to the use case of the Smart Tag Application.

## How to use the component

- import the component into yours from `src/components/general/Text`

- pass the optional props: 
    - `type` : [`"welcome"`, `"linksnheadings"`, `"pages"`, `"ustudent"`, `"people"`]
    - `color` : [`"primary"`, `"secondary"`]
    - `weight` : [`"bold"`, `"normal"`]
    - `font` : [`"inter"`] since the default font is poppins

- Example: 

```tsx
import { Text } from '../components/general/Text';
<Text font='inter' >Hey What's up</Text>
```
