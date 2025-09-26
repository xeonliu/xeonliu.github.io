---
layout: post
title: 阅读 DistServe 论文
date: 2025-09-25 14:24:00
description: distserve
tags: distserve ai_infra
categories: sample-posts
chart:
  plotly: true
---

# Backgroud
- Prefill: 计算KV Cache和First Token
    - Compute Bound

- Decode: Fetch KV Cache & Gen Next Token
    - Memory Bound 

## 延迟需求

- TPFT：Time to first token
- TPOT: Time to output token

## Batching 技术

PD混合在一起调度（包括Orca等），没法适应TTFT和TTOT的需求

## 模型并行

- 张量并行（Tensor Parallelism）：算子内并行（Intra-op Parallelsim）
    - 通信开销较大

- 流水线并行（Pipeline Parallelism）：算子间并行

# Motivations

Per GPU Goodput

## 现有解决方案

- 在一个Batch里，如果引入一个Prefill，就会提升很大的Latency
- 在Input Length提升以后，这种差异更加明显

Batching Prefill and Decoding Phase together hurt both TTFT & TTOT


### Resource & Parallelism Coupling

Prefill和Decoding具有不同的计算特征

# Design Intuitions

- Prefill Instance
    - Optimize for TTFT
- Decoding Instance

如果混合，存在短板效应。

## Disaggregating Prefill and Decoding

两张卡做Prefill，一张卡做Decoding

那Decode就很快了。

# Tradeoff Analysis

测试Batching和Parallelism。

## Prefill-Only

> 问题：那个什么K的东西，没看懂

对于 Batching

> Once the GPU becomes compute-bound, adding more requests to the batch no longer improves GPU efficiency.

对于 Parallelism

Service Level Objective (SLO)：可用性目标

- Lower Rates: Intra-op 更合适
- Rate Increase: Inter-op 更合适

## Decoding

### Batching

Decoding 吞吐量随 Batch Size 增加

多个 Prefill Instace + 单个 Decoding Instance

### Decoding

Decoding Batch Size 增加以后，会逐渐变成 Compute Bound

TP（Tensor Parallelism）（Intra）不能使得Throughput获得线性提升
但是对于Latency有用

PP可以使Throughput产生线形2提升

# Practical Problems

- Prefill长度变化，可以通过调度来均衡下来
- 通讯开销可以忽略

# Definition of Placement
- Parallelism stratagy

- Placement of High Node-Affinity Cluster（节点间网络快的）
- Placement of Low Node-Affinity Cluster（节点间网络慢的）

KV Cache Transfer only happens between the same layer?

消除跨界点通信开销。