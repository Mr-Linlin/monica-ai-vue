import { ElMessage } from "element-plus";
const useCommon = () => {
  // 复制文字功能
  const copyText = (text: string) => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      const el = document.createElement("div");
      el.textContent = text;
      document.body.appendChild(el);
      range.selectNode(el);
      selection.addRange(range);
      document.execCommand("copy");
      ElMessage.success('复制成功')
      selection.removeAllRanges();
      document.body.removeChild(el);
    }
  };
  /**
   * 
   * @param timestamp 时间戳
   * @param dateFormat 'yy-mm-dd 日期格式'
   * @param timeFormat 'hh:mm:ss 时间格式'
   * @returns 
   */
  const formatTime = (timestamp: number, dateFormat: string, timeFormat: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    let formattedDate = dateFormat.replace('yy', year).replace('mm', month).replace('dd', day);
    let formattedTime = timeFormat.replace('hh', hours).replace('mm', minutes).replace('ss', seconds);
    if (timeFormat === 'hh:mm:ss') {
      formattedTime = formattedTime.replace(/^[0:]*(?=\d)/g, '');
    }
    return `${formattedDate} ${formattedTime}`;
  }
  return {
    copyText,
    formatTime
  }
}
export default useCommon