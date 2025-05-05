function localStringformatter(localString: string) {
  const [d, t] = localString.split(", ");
  const data = [];
  for (let i = d.split("/").length - 1; i > -1; i--) {
    data.push(d.split("/").at(i));
  }

  return `[${data.join("-")} ${t}]`;
}

function logging(message: string, type: "INFO" | "ERROR" | "DEBUG" | "WARN") {
  const formattedDate = localStringformatter(new Date().toLocaleString());
  console.log(`${formattedDate} [${type}] ${message}`);
}

export { logging };
