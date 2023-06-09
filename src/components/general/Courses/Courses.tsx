import React from 'react';
import { View, StyleSheet,ScrollView,Text,Alert } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

interface Props{
    courseName: any;
    courseCode: any;
    lecturer:any;
   

}

const getRandomColor = () => {
    const colors = [
      '#157B80',
      '#32AC71',
      '#1D6CA7',
      '#ECA235',
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

const CourseCard:React.FC<Props> = ({ courseName, courseCode, lecturer }) => {
    
const cardColor= getRandomColor()
const Alertme =()=>Alert.alert("Message", "Card Header Pressed")
    return (
      
        <View style={{paddingBottom:15}}>
       <Card style={[styles.card, { backgroundColor: cardColor }]}  onPress={(Alertme)}>
        <Card.Content>
          <Title style={styles.title}>{courseName}</Title>
          <Paragraph style={styles.paragraph}>{lecturer}</Paragraph>
          <Paragraph style={styles.paragraph}>{courseCode}</Paragraph>
        </Card.Content>
      </Card>
      </View>
    );
  };

  const CoursesList = () => {
    const courses = [
      { courseName: 'Computer Networking', courseCode: 'COE475', lecturer: 'Prof. Emmanuel Akowuah' },
      { courseName: 'Artificial Intelligence', courseCode: 'COE436', lecturer: 'Selorm Klogo' },
        { courseName: 'Introduction to Programming', courseCode: 'COE421', lecturer: 'John Doe' },
        { courseName: 'Introduction to Programming', courseCode: 'COE421', lecturer: 'John Doe' },
        { courseName: 'Introduction to Programming', courseCode: 'COE421', lecturer: 'John Doe' },
       

        
    ];
  
    return (
      <ScrollView style={styles.container}>
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            courseName={course.courseName}
            courseCode={course.courseCode}
            lecturer={course.lecturer}
          />
        ))}
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      
    },
    card: {
     
      

      width:344,
      height:146,
        marginBottom: 16,
        // marginLeft:16,
        // marginRight:16,
       
      },
      title:{
        color: 'white',
      },
      paragraph:{
        color: 'white',
      }
  });
  
  export default CoursesList;
  

