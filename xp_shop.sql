/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : xp_shop

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 13/10/2023 14:15:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `module_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '模块名称',
  `type` tinyint(4) NULL DEFAULT NULL COMMENT '类型,1:表示模块,2:表示菜单,3:表示接口(API)',
  `action_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '操作名称',
  `api_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '接口名称',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '小图标',
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'url地址',
  `method` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '请求方式',
  `parent_id` int(11) NOT NULL DEFAULT 0 COMMENT '父模块id',
  `sort` int(11) NOT NULL DEFAULT 1 COMMENT '排序',
  `status` tinyint(4) NULL DEFAULT 1 COMMENT '状态,0表示禁止,1表示正常',
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '描素',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `action_name_delete_at`(`action_name`, `deleted_at`) USING BTREE,
  UNIQUE INDEX `module_name_delete_at`(`module_name`, `deleted_at`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES (1, '2023-10-09 08:32:54.837757', '2023-10-09 08:32:54.837757', NULL, '系统管理', 1, NULL, NULL, NULL, 'system', NULL, 0, 6, 1, NULL);
INSERT INTO `access` VALUES (2, '2023-10-09 08:32:54.837757', '2023-10-09 08:32:54.837757', NULL, NULL, 2, '账号管理', NULL, NULL, 'system/account', NULL, 1, 3, 1, NULL);
INSERT INTO `access` VALUES (3, '2023-10-09 08:32:54.837757', '2023-10-09 08:32:54.837757', NULL, NULL, 2, '角色管理', NULL, NULL, 'system/role', NULL, 1, 4, 1, NULL);
INSERT INTO `access` VALUES (4, '2023-10-09 08:32:54.837757', '2023-10-09 08:32:54.837757', NULL, NULL, 2, '资源管理', NULL, NULL, 'system/access', NULL, 1, 5, 1, NULL);
INSERT INTO `access` VALUES (5, '2023-10-09 08:32:54.837757', '2023-10-09 08:32:54.837757', NULL, NULL, 3, NULL, '账号列表', NULL, '/api/v1/admin/account', 'GET', 2, 1, 1, NULL);
INSERT INTO `access` VALUES (6, '2023-10-09 08:32:54.837757', '2023-10-09 08:32:54.837757', NULL, NULL, 3, NULL, '创建账号', NULL, '/api/v1/admin/account', 'POST', 2, 2, 1, NULL);
INSERT INTO `access` VALUES (7, '2023-10-09 08:32:54.837757', '2023-10-09 08:32:54.837757', NULL, NULL, 3, NULL, '根据ID删除账号', NULL, '/api/v1/admin/account/*', 'DELETE', 2, 3, 1, NULL);
INSERT INTO `access` VALUES (8, '2023-10-09 08:32:54.837757', '2023-10-09 08:32:54.837757', NULL, NULL, 3, NULL, '根据ID修改账号', NULL, '/api/v1/admin/account/*', 'PATCH', 2, 4, 1, NULL);

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `mobile` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '手机号码',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` tinyint(4) NULL DEFAULT 1 COMMENT '状态,0表示禁止,1表示正常',
  `platform` tinyint(4) NULL DEFAULT 0 COMMENT '平台:0表示普通用户(没权限),1表示为运营管理,2表示入住商家',
  `is_super` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否为超级管理员1表示是,0表示不是',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `mobile_deleted`(`mobile`, `deleted_at`) USING BTREE,
  UNIQUE INDEX `email_deleted`(`email`, `deleted_at`) USING BTREE,
  UNIQUE INDEX `username_deleted`(`username`, `deleted_at`) USING BTREE,
  UNIQUE INDEX `username_mobile_email_unique`(`username`, `mobile`, `email`) USING BTREE,
  INDEX `IDX_41dfcb70af895ddf9a53094515`(`username`) USING BTREE,
  INDEX `IDX_55754048b4958e867f033621ae`(`mobile`) USING BTREE,
  INDEX `IDX_4c8f96ccf523e9a3faefd5bdd4`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (1, '2023-10-09 08:32:54.833463', '2023-10-09 08:32:54.833463', NULL, 'admin', 'YUEzVXhwajFRTg==NzQ2N2JkYmY3ODQ1ZjA2ZjgxOGUwZjY1ZDBkZjc5MGQ=', '_admin', '_admin', 1, 0, 1);

-- ----------------------------
-- Table structure for account_last_login
-- ----------------------------
DROP TABLE IF EXISTS `account_last_login`;
CREATE TABLE `account_last_login`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `account_id` int(11) NOT NULL COMMENT '账号id',
  `last_login_ip` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '最后登录id',
  `last_login_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '最后登录地址',
  `last_login_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后登录时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_role
-- ----------------------------
DROP TABLE IF EXISTS `account_role`;
CREATE TABLE `account_role`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `account_id` int(11) NOT NULL COMMENT '账号id',
  `role_id` int(11) NOT NULL COMMENT '角色id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account_role_deleted`(`account_id`, `role_id`, `deleted_at`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_token
-- ----------------------------
DROP TABLE IF EXISTS `account_token`;
CREATE TABLE `account_token`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `user_id` int(11) NOT NULL COMMENT '关联用户表的ID',
  `token` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'token',
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `mobile` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '手机号码',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '邮箱',
  `platform` tinyint(4) NULL DEFAULT 0 COMMENT '平台:0表示普通用户(没权限),1表示为运营管理,2表示入住商家',
  `is_super` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否为超级管理员1表示是,0表示不是',
  `expire_time` timestamp(0) NULL DEFAULT NULL COMMENT '失效时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_ab3c66669facfe429164e60ab8`(`user_id`) USING BTREE,
  UNIQUE INDEX `IDX_a8985ea1add57e02e7e03ff10f`(`token`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for brand
-- ----------------------------
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of brand
-- ----------------------------
INSERT INTO `brand` VALUES ('品牌4', '2023-10-09 21:15:24.147614', '2023-10-10 08:44:52.000000', NULL, 2);
INSERT INTO `brand` VALUES ('品牌2', '2023-10-10 08:42:20.274574', '2023-10-10 08:45:32.000000', '2023-10-10 08:45:32.000000', 3);
INSERT INTO `brand` VALUES ('品牌哈哈哈', '2023-10-10 08:46:10.463392', '2023-10-10 08:46:10.463392', NULL, 4);
INSERT INTO `brand` VALUES ('品牌5', '2023-10-10 10:21:22.844197', '2023-10-10 10:21:22.844197', NULL, 5);
INSERT INTO `brand` VALUES ('品牌6', '2023-10-10 10:21:30.218418', '2023-10-10 10:21:30.218418', NULL, 6);
INSERT INTO `brand` VALUES ('品牌7', '2023-10-10 10:21:33.474260', '2023-10-10 10:21:33.474260', NULL, 7);
INSERT INTO `brand` VALUES ('品牌8', '2023-10-10 10:21:36.598934', '2023-10-10 10:21:36.598934', NULL, 8);
INSERT INTO `brand` VALUES ('品牌9', '2023-10-10 10:21:39.839891', '2023-10-10 10:21:39.839891', NULL, 9);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `main_img_url` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `img_urls` json NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `raw_price` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `real_price` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `intro` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `detail` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `maybe_delivery_time_start_at` timestamp(0) NULL DEFAULT NULL,
  `maybe_delivery_time_end_at` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `brand_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_22cc43e9a74d7498546e9a63e7`(`name`) USING BTREE,
  INDEX `IDX_2eb5ce4324613b4b457c364f4a`(`brand_id`) USING BTREE,
  CONSTRAINT `FK_2eb5ce4324613b4b457c364f4a2` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 200.20, 90.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-09 21:16:20.141832', '2023-10-12 22:08:24.336388', '2023-10-09 22:45:15.000000', 5, 2);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 300.20, 90.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-09 21:22:16.311716', '2023-10-12 22:08:24.346302', NULL, 6, 2);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name2', 100.20, 90.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-09 21:22:28.256957', '2023-10-12 22:08:24.349597', NULL, 7, 2);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 91.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:18.893346', '2023-10-10 10:22:18.893346', NULL, 8, 5);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 92.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:25.589690', '2023-10-10 10:22:25.589690', NULL, 9, 5);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 93.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:27.974944', '2023-10-10 10:22:27.974944', NULL, 10, 5);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 94.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:30.162565', '2023-10-10 10:22:30.162565', NULL, 11, 5);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 95.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:32.321658', '2023-10-10 10:22:32.321658', NULL, 12, 5);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 85.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:46.560523', '2023-10-10 10:22:46.560523', NULL, 13, 6);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 84.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:49.092816', '2023-10-10 10:22:49.092816', NULL, 14, 6);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 83.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:52.913824', '2023-10-10 10:22:52.913824', NULL, 15, 6);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 82.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:22:56.525921', '2023-10-10 10:22:56.525921', NULL, 16, 6);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 81.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:23:03.478262', '2023-10-10 10:23:03.478262', NULL, 17, 6);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 90.50, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 10:49:37.330194', '2023-10-10 10:49:37.330194', NULL, 18, 5);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 90.50, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 12:51:20.689468', '2023-10-10 12:51:20.689468', NULL, 19, 5);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 90.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 13:46:33.001426', '2023-10-10 13:46:33.001426', NULL, 20, 2);
INSERT INTO `product` VALUES ('/static/imgs/product1.png', '[\"/static/imgs/product1.png\", \"/static/imgs/product2.png\"]', 'Example Product Name', 100.20, 92.30, '这是产品简介内容', '这是产品详细介绍内容', '2023-10-10 20:00:00', '2023-10-15 20:00:00', '2023-10-10 14:20:43.394534', '2023-10-10 14:20:43.394534', NULL, 21, 2);

-- ----------------------------
-- Table structure for product_specification
-- ----------------------------
DROP TABLE IF EXISTS `product_specification`;
CREATE TABLE `product_specification`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `specification_option_ids` json NOT NULL,
  `price` decimal(10, 0) NOT NULL,
  `productId` bigint(20) NULL DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_d0425944f0354caea3a1f04269a`(`productId`) USING BTREE,
  CONSTRAINT `FK_d0425944f0354caea3a1f04269a` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_specification
-- ----------------------------
INSERT INTO `product_specification` VALUES (5, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 6);
INSERT INTO `product_specification` VALUES (6, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 6);
INSERT INTO `product_specification` VALUES (7, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 6);
INSERT INTO `product_specification` VALUES (8, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 6);
INSERT INTO `product_specification` VALUES (9, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 7);
INSERT INTO `product_specification` VALUES (10, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 7);
INSERT INTO `product_specification` VALUES (11, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 7);
INSERT INTO `product_specification` VALUES (12, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 7);
INSERT INTO `product_specification` VALUES (13, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 8);
INSERT INTO `product_specification` VALUES (14, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 8);
INSERT INTO `product_specification` VALUES (15, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 8);
INSERT INTO `product_specification` VALUES (16, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 8);
INSERT INTO `product_specification` VALUES (17, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 9);
INSERT INTO `product_specification` VALUES (18, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 9);
INSERT INTO `product_specification` VALUES (19, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 9);
INSERT INTO `product_specification` VALUES (20, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 9);
INSERT INTO `product_specification` VALUES (21, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 10);
INSERT INTO `product_specification` VALUES (22, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 10);
INSERT INTO `product_specification` VALUES (23, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 10);
INSERT INTO `product_specification` VALUES (24, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 10);
INSERT INTO `product_specification` VALUES (25, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 11);
INSERT INTO `product_specification` VALUES (26, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 11);
INSERT INTO `product_specification` VALUES (27, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 11);
INSERT INTO `product_specification` VALUES (28, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 11);
INSERT INTO `product_specification` VALUES (29, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 12);
INSERT INTO `product_specification` VALUES (30, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 12);
INSERT INTO `product_specification` VALUES (31, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 12);
INSERT INTO `product_specification` VALUES (32, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 12);
INSERT INTO `product_specification` VALUES (33, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 13);
INSERT INTO `product_specification` VALUES (34, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 13);
INSERT INTO `product_specification` VALUES (35, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 13);
INSERT INTO `product_specification` VALUES (36, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 13);
INSERT INTO `product_specification` VALUES (37, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 14);
INSERT INTO `product_specification` VALUES (38, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 14);
INSERT INTO `product_specification` VALUES (39, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 14);
INSERT INTO `product_specification` VALUES (40, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 14);
INSERT INTO `product_specification` VALUES (41, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 15);
INSERT INTO `product_specification` VALUES (42, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 15);
INSERT INTO `product_specification` VALUES (43, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 15);
INSERT INTO `product_specification` VALUES (44, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 15);
INSERT INTO `product_specification` VALUES (45, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 16);
INSERT INTO `product_specification` VALUES (46, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 16);
INSERT INTO `product_specification` VALUES (47, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 16);
INSERT INTO `product_specification` VALUES (48, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 16);
INSERT INTO `product_specification` VALUES (49, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 17);
INSERT INTO `product_specification` VALUES (50, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 17);
INSERT INTO `product_specification` VALUES (51, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 17);
INSERT INTO `product_specification` VALUES (52, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 17);
INSERT INTO `product_specification` VALUES (53, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 18);
INSERT INTO `product_specification` VALUES (54, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 18);
INSERT INTO `product_specification` VALUES (55, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 18);
INSERT INTO `product_specification` VALUES (56, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 18);
INSERT INTO `product_specification` VALUES (57, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 19);
INSERT INTO `product_specification` VALUES (58, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 19);
INSERT INTO `product_specification` VALUES (59, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 19);
INSERT INTO `product_specification` VALUES (60, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 19);
INSERT INTO `product_specification` VALUES (61, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 20);
INSERT INTO `product_specification` VALUES (62, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 20);
INSERT INTO `product_specification` VALUES (63, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 20);
INSERT INTO `product_specification` VALUES (64, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 20);
INSERT INTO `product_specification` VALUES (65, '2023-10-10 22:00:04.802455', '2023-10-10 22:00:04.802455', NULL, '[1, 3]', 200, 21);
INSERT INTO `product_specification` VALUES (66, '2023-10-10 22:07:10.521098', '2023-10-10 22:07:10.521098', NULL, '[1, 4]', 300, 21);
INSERT INTO `product_specification` VALUES (67, '2023-10-10 22:07:18.366164', '2023-10-10 22:07:18.366164', NULL, '[2, 3]', 220, 21);
INSERT INTO `product_specification` VALUES (68, '2023-10-10 22:07:25.819167', '2023-10-10 22:07:25.819167', NULL, '[2, 4]', 320, 21);

-- ----------------------------
-- Table structure for product_tags_tag
-- ----------------------------
DROP TABLE IF EXISTS `product_tags_tag`;
CREATE TABLE `product_tags_tag`  (
  `productId` bigint(20) NOT NULL,
  `tagId` bigint(20) NOT NULL,
  PRIMARY KEY (`productId`, `tagId`) USING BTREE,
  INDEX `IDX_208235f4a5c925f11171252b76`(`productId`) USING BTREE,
  INDEX `IDX_0de90b04710a86601acdff88c2`(`tagId`) USING BTREE,
  CONSTRAINT `FK_0de90b04710a86601acdff88c21` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_208235f4a5c925f11171252b760` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_tags_tag
-- ----------------------------
INSERT INTO `product_tags_tag` VALUES (6, 2);
INSERT INTO `product_tags_tag` VALUES (7, 2);
INSERT INTO `product_tags_tag` VALUES (8, 2);
INSERT INTO `product_tags_tag` VALUES (9, 2);
INSERT INTO `product_tags_tag` VALUES (10, 2);
INSERT INTO `product_tags_tag` VALUES (11, 2);
INSERT INTO `product_tags_tag` VALUES (12, 2);
INSERT INTO `product_tags_tag` VALUES (13, 2);
INSERT INTO `product_tags_tag` VALUES (14, 2);
INSERT INTO `product_tags_tag` VALUES (15, 2);
INSERT INTO `product_tags_tag` VALUES (16, 2);
INSERT INTO `product_tags_tag` VALUES (17, 2);
INSERT INTO `product_tags_tag` VALUES (18, 2);
INSERT INTO `product_tags_tag` VALUES (19, 2);
INSERT INTO `product_tags_tag` VALUES (20, 2);
INSERT INTO `product_tags_tag` VALUES (21, 2);

-- ----------------------------
-- Table structure for query-result-cache
-- ----------------------------
DROP TABLE IF EXISTS `query-result-cache`;
CREATE TABLE `query-result-cache`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `time` bigint(20) NOT NULL,
  `duration` int(11) NOT NULL,
  `query` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `result` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `module_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '模块名称',
  `method_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '方法名称',
  `method` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '请求方式',
  `url` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '请求地址',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES (1, '账号管理', '创建账号', 'POST', 'account', '2023-10-09 08:32:54.809039', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (2, '账号管理', '删除账号', 'DELETE', 'account/*', '2023-10-09 08:32:54.859899', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (3, '账号管理', '根据id修改账号信息', 'PATCH', 'account/*', '2023-10-09 08:32:54.875003', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (4, '账号管理', '根据id查询单条账号信息', 'GET', 'account/*', '2023-10-09 08:32:54.894454', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (5, '账号管理', '账号列表', 'GET', 'account', '2023-10-09 08:32:54.927297', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (6, '角色管理', '创建角色', 'POST', 'role', '2023-10-09 08:32:54.947456', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (7, '角色管理', '根据id删除角色', 'DELETE', 'role/*', '2023-10-09 08:32:54.963607', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (8, '角色管理', '根据id修改角色', 'PATCH', 'role/*', '2023-10-09 08:32:54.978504', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (9, '账号角色管理', '给账号分配角色', 'POST', 'account_role', '2023-10-09 08:32:54.994521', '2023-10-13 09:17:09.000000');
INSERT INTO `resource` VALUES (10, '角色资源管理', '给当前角色分配菜单', 'PATCH', 'role_access/menus/*', '2023-10-09 08:32:55.009818', '2023-10-13 09:17:09.000000');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '角色名称',
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '角色描素',
  `status` tinyint(4) NULL DEFAULT 1 COMMENT '状态1表示正常,0表示不正常',
  `is_default` tinyint(4) NULL DEFAULT 0 COMMENT '针对后期提供注册用,1表示默认角色,0表示非默认角色',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name_deleted`(`name`, `deleted_at`) USING BTREE,
  INDEX `IDX_ae4578dcaed5adff96595e6166`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role_access
-- ----------------------------
DROP TABLE IF EXISTS `role_access`;
CREATE TABLE `role_access`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `access_id` int(11) NOT NULL COMMENT '资源id',
  `type` tinyint(4) NOT NULL COMMENT '资源类型:2:表示菜单,3:表示接口(API)',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_access_type_deleted`(`role_id`, `access_id`, `type`, `deleted_at`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shop_cart
-- ----------------------------
DROP TABLE IF EXISTS `shop_cart`;
CREATE TABLE `shop_cart`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `user_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `productId` bigint(20) NOT NULL COMMENT '主键id',
  `productSpecificationId` bigint(20) NOT NULL COMMENT '主键id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_d528eb6bd9f3166cbb092b1127a`(`productId`) USING BTREE,
  INDEX `FK_bc1d47de2dc9bfe6d5cea32ae2c`(`productSpecificationId`) USING BTREE,
  CONSTRAINT `FK_bc1d47de2dc9bfe6d5cea32ae2c` FOREIGN KEY (`productSpecificationId`) REFERENCES `product_specification` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_d528eb6bd9f3166cbb092b1127a` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_cart
-- ----------------------------
INSERT INTO `shop_cart` VALUES (1, '2023-10-10 23:38:26.919000', '2023-10-12 22:48:31.274955', NULL, 1, 6, 6, 5);
INSERT INTO `shop_cart` VALUES (2, '2023-10-12 14:24:25.446643', '2023-10-12 22:48:31.372409', NULL, 1, 4, 6, 6);
INSERT INTO `shop_cart` VALUES (3, '2023-10-12 14:24:36.939657', '2023-10-12 22:48:31.375597', NULL, 1, 4, 6, 7);
INSERT INTO `shop_cart` VALUES (4, '2023-10-12 19:16:01.280000', '2023-10-12 22:48:48.000000', NULL, 2, 10, 6, 5);
INSERT INTO `shop_cart` VALUES (5, '2023-10-12 19:16:35.809679', '2023-10-12 22:39:15.000000', NULL, 2, 1, 6, 7);
INSERT INTO `shop_cart` VALUES (6, '2023-10-12 19:16:39.825309', '2023-10-12 22:39:15.000000', NULL, 2, 1, 6, 8);
INSERT INTO `shop_cart` VALUES (7, '2023-10-12 22:50:00.258656', '2023-10-13 11:43:24.000000', NULL, 3, 1, 15, 44);
INSERT INTO `shop_cart` VALUES (8, '2023-10-12 22:50:07.946259', '2023-10-12 22:50:07.946259', NULL, 3, 5, 15, 43);

-- ----------------------------
-- Table structure for specification
-- ----------------------------
DROP TABLE IF EXISTS `specification`;
CREATE TABLE `specification`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '规格名称',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_844078f9cb4f24d4a64c24eb18`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of specification
-- ----------------------------
INSERT INTO `specification` VALUES (3, '2023-10-10 21:23:53.349456', '2023-10-10 21:23:53.349456', NULL, '容量');
INSERT INTO `specification` VALUES (4, '2023-10-10 21:24:13.477622', '2023-10-10 21:24:13.477622', NULL, '套装');

-- ----------------------------
-- Table structure for specification_option
-- ----------------------------
DROP TABLE IF EXISTS `specification_option`;
CREATE TABLE `specification_option`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `specificationId` bigint(20) NULL DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_d51565300729c0644eb27818d9`(`specificationId`, `value`) USING BTREE,
  CONSTRAINT `FK_af95e54380f65614d140ffecd28` FOREIGN KEY (`specificationId`) REFERENCES `specification` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of specification_option
-- ----------------------------
INSERT INTO `specification_option` VALUES (1, '2023-10-10 21:24:47.206815', '2023-10-10 21:24:47.206815', NULL, '65ml', 3);
INSERT INTO `specification_option` VALUES (2, '2023-10-10 21:35:22.272045', '2023-10-10 21:35:22.272045', NULL, '100ml', 3);
INSERT INTO `specification_option` VALUES (3, '2023-10-10 21:35:33.902391', '2023-10-10 21:35:33.902391', NULL, '1瓶', 4);
INSERT INTO `specification_option` VALUES (4, '2023-10-10 21:35:37.177658', '2023-10-10 21:35:37.177658', NULL, '2瓶', 4);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_6a9775008add570dc3e5a0bab7`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES ('标签修改1', '2023-10-10 09:34:00.755856', '2023-10-10 09:34:49.000000', '2023-10-10 09:34:49.000000', 1);
INSERT INTO `tag` VALUES ('标签1', '2023-10-10 09:35:07.048020', '2023-10-10 09:35:07.048020', NULL, 2);

SET FOREIGN_KEY_CHECKS = 1;
