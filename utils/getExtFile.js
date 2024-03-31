// функция получения расширения файла
export default (filename) => {
    return filename.split('.').slice(-1) 
}
