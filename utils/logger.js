const logger = (msg) => {
  const caracter = '#';
    msg = `${caracter} ${msg} ${caracter}`
    const border = c =>new Array(msg.length +1).join(c);
    console.log(border(caracter))
    console.log(border(' '))
    console.log(msg);
    console.log(border(' '))
    console.log(border(caracter))
};

export default logger;
