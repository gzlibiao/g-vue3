<script setup name="Editor">
import { onBeforeUnmount, ref, shallowRef,onMounted } from 'vue'
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {init,message,EVENTS,postMessage} from'@/utils/post-message';
// import {CustomBtn} from'@/types/EditorButton';


onMounted(()=>{
    // console.log('mounted',EVENTS);
    init();
    message((e)=>{
        console.log(e,'child msg')
    })
})



const uuid=()=>Math.random().toString(16).substring(2);
// 测试：注册 button menu
class MyButtonMenu {
    constructor(text,call) {
        this.title = text,
        this.tag = 'button'
    }
    getValue() { return '' }
    isActive() { return false }
    isDisabled() { return false }
    exec(editor) {
        // postMessage(EVENTS.MSG,'提交了')
        if(this.call){
            this.call(editor);
        }
    }
}

const btns=[{
    text:'提交',
    key:'submit',
    call:()=>{
        console.log('提交了')
        postMessage(EVENTS.SUBMIT,valueHtml.value)
    }
},{
    text:'返回',
    key:'back',
    call:()=>{
        console.log('返回')
        postMessage(EVENTS.BACK,valueHtml.value)
    }
}]

// const menuConf = {
//   key: 'my-menu-1',
//   factory() {
//     return new MyButtonMenu()
//   },
// }

btns.forEach(o=>{
    Boot.registerMenu({
        key:o.key,
        factory(){
            return new MyButtonMenu(o.text,o.call)
        }
    })
})

// 编辑器实例，必须用 shallowRef ，重要！
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
// 编辑器配置
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        insertImage: {
            checkImage(src) {
                if (src.indexOf("http") !== 0) {
                    return "图片网址必须以 http/https 开头";
                }
                return true;
            },
        },
    }
}
// 工具栏配置
const toolbarConfig = {
    insertKeys: {
        index: 0,
        keys: ['submit','back']
    }
}
// 编辑器回调函数
const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    // window.editor = editor // 临时测试使用，用完删除
}
const handleChange = (editor) => {
    // console.log("change:", editor.children);
}
const handleDestroyed = (editor) => {
    // console.log('destroyed', editor)
}
const handleFocus = (editor) => {
    // console.log('focus', editor)
}
const handleBlur = (editor) => {
    // console.log('blur', editor)
}
const customAlert = (info, type) => {
    // alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor, event, callback) => {
    // 自定义插入内容
    // 返回值（注意，vue 事件的返回值，不能用 return）
    // callback(false) // 返回 false ，阻止默认粘贴行为
    // callback(true) // 返回 true ，继续默认的粘贴行为
}
// 及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null){
         return
    }
    // 销毁，并移除 editor
    editor.destroy()
})
</script>

<template>
    <div class="editor-wrap">
        <!-- 工具栏 -->
        <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
        />
        <!-- 编辑器 -->
        <Editor
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            @onChange="handleChange"
            @onCreated="handleCreated"
            @onDestroyed="handleDestroyed"
            @onFocus="handleFocus"
            @onBlur="handleBlur"
            @customAlert="customAlert"
            @customPaste="customPaste"
            style="height:320px"
        ></Editor>
    </div>
</template>

<style  scope>
  .editor-wrap{
      height:100%;
  }
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>