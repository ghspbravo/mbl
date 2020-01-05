const delay = (time: number = 1000): Promise<null> => new Promise((resolve, reject) => setTimeout(resolve, time))

export default delay