import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

const TabIcon = {
    Home: () => ( <MaterialDesignIcons name="home-variant" size={24} color={"#000"} /> ),
    Absensi: () => ( <MaterialDesignIcons name="calendar-check" size={24} color={"#000"} /> ),
    History: () => ( <MaterialDesignIcons name="history" size={24} color={"#000"} /> ),
    Profil: () => ( <MaterialDesignIcons name="account-circle" size={24} color={"#000"} /> ),
}

export default TabIcon