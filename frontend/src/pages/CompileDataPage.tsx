import React, { useState } from 'react';
import { fetchCompileData } from '../api/compileDataApi';

const CompileDataPage = () => {
  const [studyid, setStudyid] = useState('');
  const [pathDb, setPathDb] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await fetchCompileData({ studyid, path_db: pathDb });
      setData(result);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setData([]);
    }
  };

  return (
    <div>
      <h2>Compile Data</h2>
      <input placeholder="Study ID" value={studyid} onChange={(e) => setStudyid(e.target.value)} />
      <input placeholder="Path to DB" value={pathDb} onChange={(e) => setPathDb(e.target.value)} />
      <button onClick={handleSubmit}>Fetch Data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CompileDataPage;
