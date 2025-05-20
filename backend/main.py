from fastapi import FastAPI, Query
from functions.get_compile_data import get_compile_data
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # You can use ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CompileDataRequest(BaseModel):
    studyid: str
    path_db: str
    fake_study: Optional[bool] = False
    use_xpt_file: Optional[bool] = False

@app.post("/get_compile_data")
def run_get_compile_data(request: CompileDataRequest):
    try:
        result_df = get_compile_data(
            studyid=request.studyid,
            path_db=request.path_db,
            fake_study=request.fake_study,
            use_xpt_file=request.use_xpt_file
        )
        return result_df.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}

