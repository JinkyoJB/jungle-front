import { useCallback, useEffect, useRef } from "react";

// Y.js 및 다른 필요한 모듈 가져오기
const { awareness, doc, provider, undoManager, yNodes, yEdges } = require("../websocket");

// 멀티 유저 함수 컴포넌트 정의
function multiUser(roomId) {
    // useRef 훅을 사용하여 변수 생성
    const projectRef = useRef();

    // 앱이 마운트될 때 실행되는 콜백 함수
    const onMount = useCallback(
        (app) => {
            app.loadRoom(roomId);   // roomId에 해당하는 방 불러오기
            app.pause();            // 앱을 일시 정지 상태로 설정
            projectRef.current = app;

            // Y.js의 yNodes와 yEdges를 사용하여 페이지 내용을 대체
            app.replacePageContent(
                Object.fromEntries(yNodes.entries()),    // yNodes 맵의 항목을 객체로 변환
                Object.fromEntries(yEdges.entries()),    // yEdges 맵의 항목을 객체로 변환
                {}
            );
        },
        [roomId]
    );

    // 페이지 변경 시 실행되는 콜백 함수
    const onChangePage = useCallback(
        (app, nodes, edges) => {
            undoManager.stopCapturing(); // undoManager 캡처 중지
            doc.transact(() => {
                // Node 맵의 요소 반복문
                Object.entries(nodes).forEach(([id, node]) => {
                    if (!node) {
                        yNodes.delete(id); // node가 없으면 yNodes 맵에서 제거
                    } else {
                        yNodes.set(node.id, node); // node가 존재하면 yNodes 맵에 설정
                    }
                });

                // bindings 맵의 요소 반복문
                Object.entries(edges).forEach(([id, edge]) => {
                    if (!edge) {
                        yEdges.delete(id); // edge이 없으면 yedges 맵에서 제거
                    } else {
                        yEdges.set(edge.id, edge); // edge이 존재하면 yedges 맵에 설정
                    }
                });
            });
        },
        [] // 뭐지
    );

    // Undo 실행 시 실행되는 콜백 함수
    const onUndo = useCallback(() => {
        undoManager.undo(); // undoManager에서 undo 수행
    }, []);

    // Redo 실행 시 실행되는 콜백 함수
    const onRedo = useCallback(() => {
        undoManager.redo(); // undoManager에서 redo 수행
    }, []);

    // 사용자의 상태 변경 시 실행되는 콜백 함수
    const onChangePresence = useCallback((app, user) => {
        awareness.setLocalStateField("yUser", user); // awareness의 User 필드 변경
    }, []);

    // awareness 변경 시 사용자 업데이트
    useEffect(() => {
        const onChangeAwareness = () => {
            const project = projectRef.current;

            if (!project || !project.room) return;

            // awareness의 상태에서 다른 사용자 필터링
            const others = Array.from(awareness.getStates().entries())
                .filter(([key, _]) => key !== awareness.clientID) // 현재 사용자 제외
                .map(([_, state]) => state)
                .filter((user) => user.yUser !== undefined);

            const ids = others.map((other) => other.yUser.id);

            // project의 room에서 다른 사용자 제거
            Object.values(project.room.users).forEach((user) => {
                if (user && !ids.includes(user.id) && user.id !== project.room?.userId) {
                    project.removeUser(user.id);
                }
            });

            // project의 사용자 업데이트
            project.updateUsers(others.map((other) => other.yUser).filter(Boolean));
        };

        awareness.on("change", onChangeAwareness);

        return () => awareness.off("change", onChangeAwareness);
    }, []);

    // yNodes의 변경 이벤트 발생 시
    useEffect(() => {
        function handleChanges() {
            const project = projectRef.current;

            if (!project) return;

            // project의 페이지 내용 대체
            project.replacePageContent(
                Object.fromEntries(yNodes.entries()), // yNodes 맵의 항목을 객체로 변환
                Object.fromEntries(yEdges.entries()), // yEdges 맵의 항목을 객체로 변환
                {}
            );
        }

        yNodes.observeDeep(handleChanges);

        return () => yNodes.unobserveDeep(handleChanges);
    }, []);

    // 언마운트 시 연결 해제
    useEffect(() => {
        function handleDisconnect() {
            provider.disconnect(); // provider 연결 해제
        }

        window.addEventListener("beforeunload", handleDisconnect);

        return () => window.removeEventListener("beforeunload", handleDisconnect);
    }, []);

    return {
        onMount,
        onChangePage,
        onUndo,
        onRedo,
        onChangePresence,
    };
}

module.exports = { multiUser };
