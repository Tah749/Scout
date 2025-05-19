import { exec } from 'child_process';

export default (req, res) => {
  // Execute the python script inside
  exec('python optimise.py', (err, output, error) => {
    // If there is an error, log in console
    if (err) {
      console.error(err);
      // Return a response code and end the request
      res.status(500).end();
      return;
    }
    // Replace string and split into array
    let toArray = (output
        .trim()
        .replace('{', '')
        .replace('}', ''))
        .split(', ')
    // Return the array
    return res.send(toArray);
  });
};


