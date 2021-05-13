import E from 'wangeditor' // npm 安装
const { BtnMenu } = E
var _this = null
export  default class TextIndent extends BtnMenu {
  constructor(editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    _this = editor
    editor.config.styleWithCSS = true
    const $elem = E.$(
      `<div class="w-e-menu" data-title="首行缩进">
      <i class="w-e-icon-indent-increase"></i>
        </div>`
    )
    super($elem, editor)
  }
  // 菜单点击事件
  clickHandler() {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器
    // let selectionText = _this.selection.getSelectionText()
    let SelectionContainerElem  = _this.selection.getSelectionEndElem().elems[0]
    SelectionContainerElem.style.textIndent = '24px'
    console.log(SelectionContainerElem)

    _this.cmd.do('textIndex')

  }
  tryChangeActive() {
    if (_this.cmd.queryCommandState('bold')) {
        this.active()
    } else {
        this.unActive()
    }
  }
}