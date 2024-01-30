/* creating index */
SELECT
    tablename,
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    schemaname = 'public'
ORDER BY
    tablename,
    indexname;

/* indexing for user_parent */
CREATE INDEX idx_user_parents_child_id on user_parents (child_id);
CREATE INDEX idx_user_parents_parent_id on user_parents (parent_id);
CREATE UNIQUE INDEX idx_double_user_parents on user_parents (child_id, parent_id);

/*  indexing for schools */
CREATE INDEX idx_schools_brand_id on schools (brand_id);

/* indexing for users */
CREATE INDEX idx_users_brand_id on users (brand_id);
CREATE INDEX idx_double_users on users (first_name, last_name);

/* indexing for rooms */
CREATE INDEX idx_rooms_school_id on rooms (school_id);

/* indexing for subjects */
CREATE INDEX idx_subjects_brand_id on subjects (brand_id);

/* indexing for groups */
CREATE INDEX idx_groups_brand_id on groups (brand_id);
CREATE INDEX idx_groups_head_teacher_id on groups (head_teacher_id);
CREATE INDEX idx_groups_room_id on groups (room_id);

/* indexing for teacher subjects */
CREATE INDEX idx_teacher_subjects_teacher_id on teacher_subjects (teacher_id);
CREATE INDEX idx_teacher_subjects_subject_id on teacher_subjects (subject_id);

/* indexing for lessons */
CREATE INDEX idx_lessons_teacher_id on lessons (teacher_id);
CREATE INDEX idx_lessons_group_id on lessons (group_id);
CREATE INDEX idx_lessons_subject_id on lessons (subject_id);

/* Creating views for user-parent */
CREATE VIEW vw_students as
SELECT s.*, json_agg(row_to_json(p.*)) as parents FROM users s left JOIN user_parents up on s.id = up.child_id left JOIN users p on up.parent_id = p.id
WHERE s.role = 'student'
GROUP BY s.id;

/* view for parent */
CREATE VIEW vw_parents as
SELECT p.*, json_agg(row_to_json(s.*)) as students FROM users p left JOIN user_parents up on p.id = up.parent_id left JOIN users s on up.child_id = s.id
WHERE p.role = 'parent'
GROUP BY p.id;

/* view for brand */
CREATE VIEW vw_brands AS
SELECT 
  b.id,
  b.name,
  json_build_object(
    'schools', json_agg(
      json_build_object(
        'id', s.id, 
        'name', s.name,
        'floors', json_agg(
          json_build_object(
            'id', f.id,
            'number', f.number,
            'rooms', json_agg(
              json_build_object(
                'id', r.id,
                'number', r.number
              )
            )  
          )
        ) 
      )
    )
  ) AS nested_data
FROM brands b
LEFT JOIN schools s ON s.brand_id = b.id 
LEFT JOIN (
  SELECT id, number, school_id 
  FROM rooms
) r ON r.school_id = s.id
LEFT JOIN (
  SELECT DISTINCT school_id, number 
  FROM rooms
) f ON f.school_id = s.id
GROUP BY b.id;
