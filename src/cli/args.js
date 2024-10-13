const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = args.reduce((acc, arg, index) => {
    if (index % 2 === 0) {
      acc[arg.slice(2)] = args[index + 1];
    }
    return acc;
  }, {});

  Object.entries(parsedArgs).forEach(([key, value]) => {
    console.log(`${key} is ${value}`);
  });
};

parseArgs();
