import React, { useCallback, useEffect, useState, memo, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { Formik } from 'formik';
import * as yup from 'yup';
import { FONTS, SIZES } from '../constants/theme';
import CustomButton from '../components/custom-button.component';
import moment from 'moment';
import { api } from '../services/api';
import TrashIcon from 'react-native-vector-icons/MaterialIcons';
import EditIcon from 'react-native-vector-icons/Feather';

import { useSelector, useDispatch } from 'react-redux';

import { getPosts, fetchMorePosts, createPost, updatePost, deletePost } from '../actions/actions';
import CustomDialog from '../components/custom-dialog.component';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
});


const MainScreen = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const { username, myUsername } = route.params;

  const { posts, loading } = useSelector(
    (state) => state.postsReducer
  );

  const dispatch = useDispatch();
  const fetchPosts = () => dispatch(getPosts());

  // controlling refresh data
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);




  const success = {
    backgroundColor: '#47B960',
  }
  const disabled = {
    backgroundColor: '#e2e2e2',
  }
  const buttonDeleteStyle = {
    backgroundColor: '#FF5151',
  }
  const buttonCancelStyle = {
    backgroundColor: '#7695EC',
  }

  let isMounted = useRef(false);

  const showModal = () => {
    setVisible(true)
  }
  const hideModal = () => {
    setVisible(false)
  }

  const showEditModal = () => {
    setEditModalVisible(true)
  }
  const hideEditModal = () => {
    setEditModalVisible(false)
  }

  const handleEndReached = () => {
    if (!loading) {
      dispatch(fetchMorePosts)
    }
  }

  



  useEffect(() => {
    isMounted.current = true;
    fetchPosts();
    return () =>
      (isMounted.current = false);
  }, [])

  const headerComponent = () => {
    return (
      <Formik
        initialValues={{ username: myUsername, title: '', content: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          dispatch(createPost(values));
          fetchPosts();
          formikActions.resetForm();

        }}
        validateOnChange
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>What's on your mind?</Text>
              <Text style={styles.formText}>Title</Text>
              <TextInput
                mode='outlined'
                style={styles.input}
                label="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              //error={errors.title}
              />
              <Text style={styles.formText}>Content</Text>
              <TextInput
                mode='outlined'
                style={styles.multilineInput}
                multiline
                label="Content"
                onChangeText={handleChange('content')}
                onBlur={handleBlur('content')}
                value={values.content}
              //error={errors.content}
              />
              <View style={{ alignSelf: 'flex-end', }}>
                {loading ?
                  <ActivityIndicator size={24} color={'#7695EC'} /> :
                  <CustomButton
                    disabledStyle={!values.title || !values.content ? disabled : null}
                    onDisable={!values.title || !values.content ? true : false}
                    title={'Create'}
                    onPress={handleSubmit} />}
              </View>
            </View>


          </>
        )}
      </Formik>
    )
  }

  const renderPosts = ({ item }) => {
    const { id, username, created_datetime, title, content } = item;
    return (

      <>
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={styles.postTitle}>{title}</Text>
            <View style={[styles.iconsWrapper, { display: username === myUsername ? 'flex' : 'none' }]}>
              <TrashIcon onPress={() => {
                showModal();
                setSelectedItemId(id);
              }} name='delete-forever' size={24} color={'#fff'} style={{ marginRight: 20 }} />
              <EditIcon onPress={() => {
                showEditModal();
                setSelectedItemId(id)
              }} name='edit' size={24} color={'#fff'} />
            </View>
          </View>
          <View style={{ padding: 16 }}>
            <View style={styles.flex}>
              <Text style={styles.postUsername}>@{username}</Text>
              <Text style={styles.postTime}>{moment(created_datetime).fromNow()}</Text>
            </View>
            <Text style={styles.postText}>{content}</Text>
          </View>
        </View>
      </>
    )
  }


  return (
    <View style={styles.container}>

      <View>
        {loading ?
          <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={24} color={'#7695EC'} />
          </View>
          :
          <FlatList
            data={posts}
            keyExtractor={item => item?.id}
            renderItem={renderPosts}
            ListHeaderComponent={headerComponent}
            showsVerticalScrollIndicator={false}
            bounces={false}
           // onEndReached={handleEndReached}


            // prevent app memory leak
           /*  ListFooterComponent={() => (
              <ActivityIndicator animating size={20} color={'#7695EC'} />
            )} */

            initialNumToRender={5}
            
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }



          />
        }
      </View>
      <CustomDialog
      isDismissable={false}
        isVisible={visible}
      >

        <View style={[styles.modalContent, { alignSelf: 'center' }]}>
          <Text style={styles.modalTitle}>Are you sure you want to delete this item?</Text>
        </View>

        <View style={{ width: '100%', justifyContent: 'space-evenly', alignSelf: 'flex-end', flexDirection: 'row' }}>
          <CustomButton onPress={hideModal} title={'Cancel'} cancelStyle={buttonCancelStyle} />

          {loading ?
            <ActivityIndicator size={24} color={'#7695EC'} /> :


            <CustomButton
              onPress={() => {
                dispatch(deletePost(selectedItemId));
                hideModal();
                fetchPosts();
              }}
              title={'Delete'}
              deleteStyle={buttonDeleteStyle} />
          }

        </View>

      </CustomDialog>

      <CustomDialog
      isDismissable={false}
        isVisible={editModalVisible}
      >

        <Formik
          initialValues={{ title: '', content: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, formikActions) => {
            dispatch(updatePost(selectedItemId, values));
            formikActions.resetForm();
            hideEditModal();
            fetchPosts();
          }}
          validateOnChange
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <Text style={styles.formTitle}>Edit Item</Text>
              <TextInput
                mode='outlined'
                style={styles.input}
                label="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              //error={errors.title}
              />
              <Text style={styles.formText}>Content</Text>
              <TextInput
                mode='outlined'
                style={styles.multilineInput}
                multiline
                label="Content"
                onChangeText={handleChange('content')}
                onBlur={handleBlur('content')}
                value={values.content}
              //error={errors.content}
              />
              <View style={{ width: '100%', justifyContent: 'space-evenly', alignSelf: 'flex-end', flexDirection: 'row' }}>
                <CustomButton
                  title={'Cancel'}
                  onPress={hideEditModal} />
                {loading ?
                  <ActivityIndicator size={24} color={'#7695EC'} /> :


                  <CustomButton
                    successStyle={success}
                    onDisable={!values.title || !values.content ? true : false}
                    title={'Save'}
                    onPress={handleSubmit} />
                }

              </View>



            </>
          )}
        </Formik>


      </CustomDialog>
    </View>

  )
}


const styles = StyleSheet.create({

  container: {
    padding: 16,
  },
  formContainer: {
    marginTop: 24,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16
  },
  button: {
    marginTop: 16,
  },
  card: {
    backgroundColor: 'red'
  },

  //form
  formTitle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,

    fontSize: 20,
    fontWeight: '700'
  },
  formText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.bodyLarge,
    fontWeight: '400',
    marginTop: 24
  },
  input: {
    width: '100%',

    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: '#999999',

  },
  multilineInput: {
    width: '100%',
    backgroundColor: '#fff',
    height: 120,
    paddingTop: 8,
    paddingBottom: 8,
  },

  // posts

  postCard: {
    marginTop: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#999999',
    overflow: 'hidden',

  },
  postHeader: {
    width: '100%',
    padding: 16,
    backgroundColor: '#7695EC',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  postTitle: {
    color: "#FFF",
    fontFamily: FONTS.medium,
    fontSize: SIZES.h2,
    fontWeight: '700'
  },
  postUsername: {
    marginTop: 24,
    marginBottom: 16,
    color: '#777',
    fontFamily: FONTS.medium,
    fontSize: SIZES.bodyLarge,
    fontWeight: '700',
  },
  postText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.bodyLarge,
    fontWeight: '400',
    marginBottom: 24
  },
  postTime: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.bodySmall,
    fontWeight: '400',
  },

  // flex style
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  //modal 
  // modal
  modalContent: {
    marginBottom: 38,
  },
  modalActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  modalTitle: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.h2,
    color: "#000"
  },
  modalText: {
    marginTop: 16,

    fontFamily: FONTS.regular,
    fontSize: SIZES.bodyMedium,
    color: "#000"
  },
})
export default memo(MainScreen);