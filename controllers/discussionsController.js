// controllers/discussionsController.js
"use strict";

const res = require("express/lib/response");

const Discussion = require("../models/Discussion"), // 사용자 모델 요청
  getDiscussionParams = (body, user) => {
    return {
      title: body.title,
      description: body.description,
      author: user,
      category: body.category,
      tags: body.tags,
    };
  };

module.exports = {
  /**
   * =====================================================================
   * C: CREATE / 생성
   * =====================================================================
   */
  // 1. new: 액션,
  let discussionParams = getDiscussionParams(req.body, req.user);

  // Discussion.register(...)를 사용하지 마세요.
  // 오히려 Discussion.create(...)를 사용하세요.
  Discussion.create(discussionParams, (err, newDiscussion) => {
    if (err) {
      // 오류 처리
      console.error(err);
      return res.status(500).send(err);
    }
    // 성공적으로 생성되었을 때의 처리
    res.status(201).json(newDiscussion);
  }),
};
  // 2. create: 액션,
    // 또한 create 작업에서 Discussion.register(...)를 사용하지 마세요 - 오히려 Discussion.create(...)를 사용하세요.
  // register()는 passport를 사용하여 사용자를 등록하기 위한 것이고, create()는 MongoDB 데이터베이스에 새 객체를 생성하기 위한 Mongoose 메서드입니다.
  let discussionParams = getDiscussionParams(req.body, req.user);

  Discussion.create(discussionParams, (err, newDiscussion) => {
    if (err) {
      // 오류 처리
      console.error(err);
      return res.status(500).send(err);
    }
    // 성공적으로 생성되었을 때의 처리
    res.status(201).json(newDiscussion);
  });
  // 3. redirectView: 액션,
  /**
   * =====================================================================
   * R: READ / 조회
   * =====================================================================
   */
  /**
   * ------------------------------------
   * ALL records / 모든 레코드
   * ------------------------------------
   */
  // 4. index: 액션,
  // Discussion.find() 다음에 .then()을 추가하기 전에 .populate("author").exec()를 추가하여 토론과 사용자를 연결할 수 있도록 합니다.
  Discussion.find()
  .populate("author")
  .exec()
  .then(discussions => {
    res.status(200).json(discussions);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
; 
  // 5. indexView: 엑션,
  /**
   * ------------------------------------
   * SINGLE record / 단일 레코드
   * ------------------------------------
   */
  // 6. show: 액션,
   // Discussion.findById(req.params.id) 다음에 .then()을 추가하기 전에
  // .populate("author").populate("comments")를 추가하여 토론과 사용자, 댓글을 연결할 수 있도록 합니다.
  Discussion.findById(req.params.id)
    .populate("author")
    .populate("comments")
    .exec()
    .then(discussion => {
      if (!discussion) {
        return res.status(404).send("Discussion not found");
      }
      // 조회수 증가 및 저장
      discussion.views++;
      discussion.save()
        .then(updatedDiscussion => {
          res.status(200).json(updatedDiscussion);
        })
        .catch(saveErr => {
          console.error(saveErr);
          res.status(500).send(saveErr);
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
;
  // 7. showView: 액션,
  /**
   * =====================================================================
   * U: UPDATE / 수정
   * =====================================================================
   */
  // 8. edit: 액션,
   // Discussion.findById(req.params.id) 다음에 .then()을 추가하기 전에
  // .populate("author").populate("comments")를 추가하여 토론과 사용자, 댓글을 연결할 수 있도록 합니다.
  Discussion.findById(req.params.id)
    .populate("author")
    .populate("comments")
    .exec()
    .then(discussion => {
      if (!discussion) {
        return res.status(404).send("Discussion not found");
      }
      // 편집을 위한 처리
      res.status(200).json(discussion);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
;
  // 9. update: 액션,
  // let discussionID = req.params.id;와 let discussionParams = getDiscussionParams(req.body);를 사용하여 토론 파라미터와 ID를 얻으세요.
  // 그런 다음 .then() 전에 .populate("author")를 사용하여 토론과 사용자가 연결되었는지 확인하세요.
  let discussionID = req.params.id;
  let discussionParams = getDiscussionParams(req.body);

  Discussion.findByIdAndUpdate(discussionID, discussionParams, { new: true })
    .populate("author")
    .exec()
    .then(updatedDiscussion => {
      if (!updatedDiscussion) {
        return res.status(404).send("Discussion not found");
      }
      res.status(200).json(updatedDiscussion);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
;
  /**
   * =====================================================================
   * D: DELETE / 삭제
   * =====================================================================
   */
  // 10. delete: 액션,
;
