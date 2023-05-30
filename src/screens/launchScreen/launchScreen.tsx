import { Button } from "../../components/general/Button";
import { Text } from "../../components/general/Text";
import { Container, StudentWrapper } from "./styles";

export const LaunchScreen = () => {
    return (
        <Container>
        <Text type="welcome">Welcome!</Text>
        <Text type="ustudent">Are you a student or a lecturer?</Text>

        <StudentWrapper>
        <Button text="Student" type="status" textColor="white" textType="ustudent"/>
        <Button text="Lecturer" type="status" textColor="white" textType="ustudent"/>
        </StudentWrapper>
        </Container>
    );
    }