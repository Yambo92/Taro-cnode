export function myTimeLocal(inputTime) {
  if (!inputTime) {
    return "";
  }
  let localTime = "";
  inputTime = new Date(inputTime).getTime();
  //返回的是格林威治时间与本地时间之间的时差(此方法返回的是分钟)
  const offset = new Date().getTimezoneOffset();
  localTime = new Date(inputTime - offset * 60000).toISOString();
  localTime = localTime.substr(0, localTime.lastIndexOf("."));
  localTime = localTime.replace("T", " ");
  return localTime;
}
