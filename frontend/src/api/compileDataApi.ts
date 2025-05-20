import axios from 'axios';

export const fetchCompileData = async (data: {
  studyid: string;
  path_db: string;
  fake_study?: boolean;
  use_xpt_file?: boolean;
}) => {
  const response = await axios.post('http://localhost:8000/get_compile_data', data);
  return response.data;
};
