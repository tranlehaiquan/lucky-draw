const delayer = (time: number): Promise<void> => {
  return new Promise((rs, rj) => setTimeout(rs, time));
}

export default delayer;