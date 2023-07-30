// import {
//     View,
//     Text,
//     ActivityIndicator,
//     Image,
//     RefreshControl,
//     ScrollView,
//     TouchableOpacity,
//     StyleSheet,
// } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Link } from 'native-base';
// import { AuthContext } from '../../context/AuthContext';
// import { style } from './Timetable/styles';
// import { ReturnProps, TimetableProps } from './Timetable/props';
// import { CourseContext } from '../../context/CourseContext';
// import axios from 'axios';
// import { transformLessonData } from '../../services/timeTableDisplay';
// import { TimetableDaysContext } from '../../context/TimeTableContext';
// import { LessonRoomContext } from '../../context/LectureRoomContext';
// import { getLectureRoomUidByDayAndTime } from '../../services/getLectureRoomUidByDay';
// import { getLessonIdByDayAndTime } from '../../services/getLessonIdByDay';
// import { LessonContext } from '../../context/LessonContext';
// import { useQuery } from 'react-query';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { LessonContextForLecturers } from '../../context/LessonContextForLecturers';
// import FloatingButton from '../../components/general/FloatingButton/FloatingButton';
// import { appBlue } from '../../resources/colors/colors';

// const RowWithFlex = (props: TimetableProps) => {
//     const { authorizationKey, userType } = useContext(AuthContext);
//     const { IDcourse, courseTitle } = useContext(CourseContext);
//     const { setDays } = useContext(TimetableDaysContext);
//     const { setLessonRoomId } = useContext(LessonRoomContext);
//     const [isDaysSet, setIsDaysSet] = useState(false);
//     const { setIdLesson } = useContext(LessonContext);
//     const { setIdLessonForLecturers, idLessonForLecturers } = useContext(
//         LessonContextForLecturers
//     );
//     const [refreshing, setRefreshing] = React.useState(false);
//     const [lessons1, setLessons] = useState<ReturnProps[]>([]);
//     const fetchLessonsForCourse = async () => {
//         try {
//             const headers = { Authorization: `${authorizationKey}` };
//             const response = await axios.get(
//                 `https://smart-tag.onrender.com/lessons/course/${IDcourse}`,
//                 { headers }
//             );
//             return response.data;
//         } catch (error) {
//             throw new Error('Failed to fetch timetable for this course');
//         }
//     };

//     const {
//         data: lessons = [],
//         isLoading: isFetchingLessons,
//         isError,
//         error,
//         refetch,
//     } = useQuery<ReturnProps[]>(['lessons', IDcourse], fetchLessonsForCourse);

//     const { days, timeRanges } = transformLessonData(lessons);

//     useEffect(() => {
//         if (lessons.length > 0 && !isDaysSet) {
//             const { days } = transformLessonData(lessons);
//             setDays(days);
//             setIsDaysSet(true);
//         }
//     }, [lessons, isDaysSet, setDays]);

//     useEffect(() => {
//         const uid = getLectureRoomUidByDayAndTime(lessons);
//         const lessonid = getLessonIdByDayAndTime(lessons);
//         // console.log(lessonid)
//         if (uid) setLessonRoomId(uid);
//         if (lessonid) {
//             // idLessonForLecturers
//             // console.log(lessonid);

//             setIdLesson(lessonid);
//             setIdLessonForLecturers(lessonid);
//             // console.log("lesson id for lecturer "+idLessonForLecturers)
//         }
//     }, [lessons, setLessonRoomId]);

//     const onRefresh = React.useCallback(() => {
//         setRefreshing(true);
//         refetch()
//             .then(() => {
//                 setRefreshing(false);
//             })
//             .catch(() => {
//                 setRefreshing(false);
//             });
//     }, []);

//     const handleDeleteRow = (id: number) => {
//         // Filter out the row with the specified ID and update the state
//         setLessons(prevLessons =>
//             prevLessons.filter(lesson => lesson.id !== id)
//         );
//     };

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
//             <View>
//                 <Text style={style.headerText}>{courseTitle}</Text>
//             </View>
//             <View style={style.container}>
//                 <ScrollView
//                     refreshControl={
//                         <RefreshControl
//                             refreshing={refreshing}
//                             onRefresh={onRefresh}
//                         />
//                     }
//                 >
//                     <View style={style.line}></View>

//                     {isFetchingLessons ? (
//                         <View>
//                             <ActivityIndicator size="large" color="#0000ff" />
//                         </View>
//                     ) : lessons.length === 0 ? (
//                         <View style={style.emptyContainer}>
//                             <Image
//                                 style={style.image}
//                                 source={require('../../../../assets/images/clock.jpg')}
//                             />
//                             <Text style={style.emptyText}>
//                                 No timetable available.
//                             </Text>
//                         </View>
//                     ) : (
//                         <View style={style.direction}>
//                             {lessons.map(lesson => (
//                                 <View
//                                     key={lesson.id}
//                                     style={styles.rowContainer}
//                                 >
//                                     <TouchableOpacity
//                                         style={[styles.flex1Child, styles.card]}
//                                         onPress={() =>
//                                             handleDeleteRow(lesson.id)
//                                         }
//                                     >
//                                         <Text>{lesson.content}</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         style={[styles.flex2Child, styles.card]}
//                                         onPress={() =>
//                                             handleDeleteRow(lesson.id)
//                                         }
//                                     >
//                                         <Text>{lesson.content}</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             ))}
//                         </View>
//                     )}
//                 </ScrollView>

//                 {userType === 'lecturer' && (
//                     <FloatingButton navigation={props.navigation} />
//                 )}
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     rowContainer: {
//         flexDirection: 'row',
//         // Optional: You can add more styles here to control the container's appearance
//     },
//     flex1Child: {
//         flex: 1,
//         backgroundColor: appBlue,
//         borderRadius: 5,
//         marginBottom: 10,
//         padding: 10,
//     },
//     flex2Child: {
//         flex: 2,
//         backgroundColor: appBlue,
//         borderRadius: 5,
//         marginBottom: 10,
//         padding: 10,
//     },
//     card: {
//         backgroundColor: appBlue,
//         borderRadius: 5,
//         marginBottom: 10,
//         padding: 10,
//     },
// });

// export default RowWithFlex;
