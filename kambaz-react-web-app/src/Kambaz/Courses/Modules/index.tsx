import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    editModule,
    updateModule as updateModuleRedux,
    deleteModule as deleteModuleRedux,
    setModules
} from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import type { Module } from "./client";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import { BsGripVertical } from "react-icons/bs";
import type { RootState } from "../../store";

export default function Modules() {
    const { cid } = useParams<{ cid: string }>();
    const [moduleName, setModuleName] = useState<string>("");
    const modules = useSelector((state: RootState) => state.modulesReducer.modules as Module[]);
    const dispatch = useDispatch();

    // 加载模块
    useEffect(() => {
        void (async () => {
            if (!cid) return;
            const serverModules = await coursesClient.findModulesForCourse(cid);
            dispatch(setModules(serverModules));
        })();
    }, [cid, dispatch]);

    const createModuleForCourse = async () => {
        if (!cid || !moduleName.trim()) return;
        const newModule = await coursesClient.createModuleForCourse(cid, { name: moduleName });
        dispatch(addModule(newModule));
        setModuleName("");
    };

    const saveModule = async (mod: Module) => {
        const updated = await modulesClient.updateModule(mod);
        dispatch(updateModuleRedux(updated));
    };

    const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModuleRedux(moduleId));
    };

    return (
        <div id="wd-modules">
            <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={createModuleForCourse}
            />
            <br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules-list">
                {modules.map((mod) => (
                    <ListGroup.Item key={mod._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center w-75">
                                <BsGripVertical className="me-2 fs-3 text-danger" />
                                {!mod.editing && <span className="flex-grow-1">{mod.name}</span>}
                                {mod.editing && (
                                    <FormControl
                                        className="w-50 d-inline-block"
                                        value={mod.name}
                                        onChange={e =>
                                            dispatch(updateModuleRedux({ ...mod, name: e.target.value }))
                                        }
                                        onKeyDown={e => {
                                            if (e.key === "Enter") {
                                                void saveModule({ ...mod, editing: false });
                                            }
                                        }}
                                    />
                                )}
                            </div>
                            <ModuleControlButtons
                                moduleId={mod._id}
                                deleteModule={removeModule}
                                editModule={(id: string) => dispatch(editModule(id))}
                            />
                        </div>
                        {mod.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {mod.lessons.map((lesson: string, idx: number) => (
                                    <ListGroup.Item key={idx}
                                                    className="wd-lesson p-3 ps-3 d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3 text-danger" />
                                            <span>{lesson}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <LessonControlButtons />
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}