import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { Item } from "../screens/ExampleGestureList";

interface Props {
    close: () => void;
    onSave: (text: string) => void;
    onUpdate: (id: string, text: string) => void;
    item?: Item;
}

export function AddEditItemModal({ item, close, onSave, onUpdate }: Props) {
    const [text, setText] = useState(item?.text || "");

    const handleSave = () => {
        if (!text.trim()) {
            Alert.alert("Falha", "Não é possivel cadastrar um item vazio");
            return;
        }

        if (item) {
            onUpdate(item.id, text);
        } else {
            onSave(text);
        }
        close();
    }

    return (
        <Portal>
            <Modal 
                visible={true}
                onDismiss={close} 
                contentContainerStyle={style.container}
            >
                <TextInput value={text} onChangeText={setText} />
                <Button onPress={handleSave}>Salvar</Button>
            </Modal>
        </Portal>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    }
});