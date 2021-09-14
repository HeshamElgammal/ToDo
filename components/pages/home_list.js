import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, TextInput, StatusBar, AsyncStorage } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem } from "../redux/actions/delete_item_action"
import { add_item } from '../redux/actions/add_item_action'
import { update_item } from "../redux/actions/update_item_action"
const { width, height } = Dimensions.get("screen")
import AntDesign from "react-native-vector-icons/AntDesign"
import { Storage_data } from '../redux/actions/storage_data'





const Home_list = () => {
    const dispatch = useDispatch()
    const select_list = useSelector(state => state.App.list)
    const [show_add_input, set_show_add_input] = useState(false)
    const [show_update_input, set_show_update_input] = useState(false)
    const [name, setName] = useState("")
    const [update_name, set_update_name] = useState()
    const [update_index, set_update_index] = useState()


    const get_data = async () => {
        let storage_list = await AsyncStorage.getItem("storage_list")
        if (storage_list == null) {
            dispatch(Storage_data(JSON.stringify(select_list)))
            console.log("home list : " + select_list)
        } else {
            console.log("home list : " + JSON.stringify(storage_list))
            dispatch(Storage_data(storage_list))
        }

    }
    useLayoutEffect(() => {
        get_data()
        // AsyncStorage.clear()
    }, [])
    function TextInput_add_field() {
        return (
            <>
                {show_add_input ?
                    <View style={styles.container_add_update}>
                        <TextInput
                            style={styles.input_add_update}
                            value={name}
                            onChangeText={(value) => {
                                setName(value)
                            }}
                            placeholder="enter name.."
                            placeholderTextColor="#444"

                        />
                        <View style={styles.container_add_update_buttons}>
                            <TouchableOpacity
                                style={styles.button_add_update}
                                onPress={() => {
                                    set_show_add_input(!show_add_input)
                                    setName("")
                                    let new_item = {
                                        name: name,
                                        id: select_list.length
                                    }
                                    if (new_item.name != "") {
                                        // select_list.push(new_item)

                                        dispatch(add_item(new_item))
                                    }

                                }}
                            >
                                <Text style={{ color: "#fff" }}>add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button_add_update, { backgroundColor: "#1565c0" }]}
                                onPress={() => {
                                    set_show_add_input(!show_add_input)
                                }}
                            >
                                <Text style={{ color: "#fff" }}>cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    : null
                }

            </>
        )
    }
    function TextInput_update_field() {
        return (
            <>
                {show_update_input ?
                    <View style={styles.container_add_update}>
                        <TextInput
                            style={styles.input_add_update}
                            value={update_name}
                            onChangeText={(value) => {
                                set_update_name(value)
                            }}
                            placeholder="update name.."
                            placeholderTextColor="#444"
                        />
                        <View style={styles.container_add_update_buttons}>
                            <TouchableOpacity
                                style={styles.button_add_update}
                                onPress={() => {
                                    set_show_update_input(!show_update_input)

                                    dispatch(update_item(update_name, update_index))
                                }}
                            >
                                <Text style={{ color: "#fff" }}>update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button_add_update, { backgroundColor: "#1565c0" }]}
                                onPress={() => {
                                    set_show_update_input(!show_update_input)

                                }}
                            >
                                <Text style={{ color: "#fff" }}>cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    : null
                }

            </>
        )
    }
    return (
        <>
            <View style={[styles.container, { opacity: show_add_input || show_update_input ? .6 : 1 }]}>
                <StatusBar
                    translucent={false}
                    backgroundColor="#fffd"
                    barStyle="dark-content"
                />
                <View style={styles.header}>
                    <Text>TO Do List</Text>
                </View>
                {(select_list.length >= 1) ?
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{ width: "90%", paddingBottom: "2%" }}
                        data={select_list}
                        renderItem={({ item, index }) => (
                            <View style={[styles.item_container, { marginVertical: 3 }]}>
                                <TouchableOpacity
                                    style={{ position: "absolute", left: "90%", top: "5%" }}
                                    onPress={() => {
                                        dispatch(deleteItem(index))
                                    }}
                                >
                                    <AntDesign
                                        name="close"
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ position: "absolute", left: "80%", top: "5%" }}
                                    onPress={() => {
                                        set_show_update_input(true)
                                        set_update_name(item.name)
                                        set_update_index(index)
                                    }}
                                >
                                    <AntDesign
                                        name="edit"
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                                <Text style={{ color: "#ffff" }}>{item.name}</Text>
                            </View>
                        )}
                    />
                    :
                    <View style={styles.container_empty_list}>
                        <Text>list empty</Text>
                    </View>
                }

                <TouchableOpacity style={[styles.item_container, {
                    alignItems: "center",
                    paddingLeft: 0,
                    borderRadius: 0,
                    position: "absolute",
                    top: height * .855,
                    left: 0
                }]}
                    onPress={() => {

                        set_show_add_input(true)
                    }}
                >
                    <Text style={{ color: "#fff" }}>add</Text>
                </TouchableOpacity>
            </View>
            {TextInput_add_field()}
            {TextInput_update_field()}
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height,
        alignItems: "center",
        backgroundColor: "#ffff",
    },
    header: {
        width: "100%",
        height: height * .08,
        backgroundColor: "#ffff",
        borderBottomWidth: .4,
        alignItems: "center",
        justifyContent: "center",

    },
    item_container: {
        width: "100%",
        height: height * .1,
        alignItems: "flex-start",
        justifyContent: "center",
        // marginTop: 5,
        backgroundColor: "#1565c0",
        elevation: 6,
        borderRadius: 5,
        shadowColor: "#1565c0",
        paddingLeft: "3%"
    },
    container_add_update: {
        position: "absolute",
        top: "30%",
        left: "10%",
        width: "80%",
        height: height * .3,
        backgroundColor: "#ffffff",
        elevation: 2,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 20
    },
    input_add_update: {
        width: "80%",
        height: height * .08,
        borderRadius: 25,
        borderWidth: .7,
        color: "#000",
        paddingHorizontal: "3%"
    },
    button_add_update: {
        width: "40%",
        height: "100%",
        backgroundColor: "#a00",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    container_add_update_buttons: {
        width: "100%",
        marginTop: height * .05,
        flexDirection: "row",
        justifyContent: "space-around",
        height: height * .06,
    },
    container_empty_list: {
        height: height * .8,
        width: "100%",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#fff"
    }
})


export default Home_list