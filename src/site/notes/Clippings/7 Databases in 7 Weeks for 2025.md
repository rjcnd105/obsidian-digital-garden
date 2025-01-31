---
{"dg-publish":true,"title":"7 Databases in 7 Weeks for 2025","source":"https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/","author":["[[Matt Blewitt]]"],"published":null,"created":"2024-12-06","description":"7 databases to explore in 2025.","tags":["clippings"],"createdAt":"2024.12.06 금 오후 12:58","modifiedAt":"2025.01.31 금 오후 14:20","permalink":"/Clippings/7 Databases in 7 Weeks for 2025/","dgPassFrontmatter":true}
---


I’ve been running databases-as-a-service for a long time, and there are always new things to keep abreast of - new technologies, different ways of solving problems, not to mention all the research coming out of universities. In 2025, consider spending a week with each of these database technologies.
저는 오랫동안 서비스형 데이터베이스를 운영해 왔으며, 대학에서 나오는 모든 연구는 말할 것도 없고 새로운 기술, 다양한 문제 해결 방법 등 항상 새로운 소식을 접할 수 있습니다. 2025년에는 이러한 데이터베이스 기술 각각에 대해 일주일을 투자해 보세요.

![A line drawing of a bookshelf, with the books labelled for each database covered - PostgreSQL, SQLite, DuckDB, ClickHouse, FoundationDB, TigerBeetle and CockroachDB](https://matt.blwt.io/7-databases-in-7-weeks-for-2025/header.webp)

## Preamble 서문

These aren’t the “7 Best Databases” or something similar to power a Buzzfeed listicle - these are just 7 databases that I think are worth your time to really look into for a week or so. You might ask something like “why not Neo4j or MongoDB or MySQL/Vitess or <insert other db here>” - the answer is mostly that I don’t find them interesting. I’m also not covering Kafka or other similar streaming data services - definitely worth your time, but not covered.
이 데이터베이스는 "7가지 최고의 데이터베이스" 또는 이와 유사한 제목의 버즈피드 리스팅을 위한 것이 아니라, 일주일 정도 시간을 들여 살펴볼 만한 가치가 있다고 생각되는 7가지 데이터베이스를 소개한 것일 뿐입니다. "왜 Neo4j나 MongoDB, MySQL/Vitess, <인서트 다른 데이터베이스는 안 되나요>"와 같은 질문을 하실 수도 있지만, 대부분 흥미롭지 않다는 대답이 돌아올 것입니다. 또한 Kafka나 기타 유사한 스트리밍 데이터 서비스도 다룰 가치가 있지만, 이 글에서는 다루지 않습니다.

## Table of Contents 목차

1. [PostgreSQL](https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/#1-postgresql)
2. [SQLite](https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/#2-sqlite)
3. [DuckDB](https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/#3-duckdb)
4. [ClickHouse](https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/#4-clickhouse)
5. [FoundationDB](https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/#5-foundationdb)
6. [TigerBeetle 타이거 비틀](https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/#6-tigerbeetle)
7. [CockroachDB 바퀴벌레DB](https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/#7-cockroachdb)

- [Wrap Up 마무리](https://matt.blwt.io/post/7-databases-in-7-weeks-for-2025/#wrap-up)

## 1\. PostgreSQL

### The Default Database 기본 데이터베이스

“Just use Postgres” is basically a meme at this point, and for good reason. [PostgreSQL](https://www.postgresql.org/) is the pinnacle of [boring technology](https://boringtechnology.club/), and should be the database you reach for when you need a client-server model for your database. ACID compliant, plenty of interesting tricks for replication - both physical and logical - and incredibly well supported across all the major vendors.
"그냥 Postgres를 사용하세요"라는 말은 이 시점에서 기본적으로 밈이며, 그럴 만한 이유가 있습니다. [PostgreSQL](https://www.postgresql.org/)는 [보링 기술의 정점이며, 데이터베이스에 클라이언트-서버 모델이 필요할 때 가장 먼저 찾아야 하는 데이터베이스입니다. ACID를 준수하고, 물리적 및 논리적 복제를 위한 흥미로운 트릭이 많으며, 모든 주요 공급업체에서 믿을 수 없을 정도로 잘 지원됩니다.](https://boringtechnology.club/)

My favourite feature of Postgres, however, are [extensions](https://wiki.postgresql.org/wiki/Extensions). This is where I feel Postgres really comes alive in a way that few other databases can. There are extensions for almost everything you could want - [AGE](https://age.apache.org/) enables graph data structures and the user of the Cypher query language, [TimescaleDB](https://docs.timescale.com/self-hosted/latest/) enables time-series workloads, [Hydra Columnar](https://github.com/hydradatabase/hydra/tree/main/columnar) provides an alternate columnar storage engine, and so on. I’ve [written about writing an extension](https://matt.blwt.io/post/building-a-postgresql-extension-line-by-line) relatively recently if you’d like to give it a go yourself.
하지만 제가 Postgres에서 가장 좋아하는 기능은 [확장 기능입니다. 다른 데이터베이스에서는 거의 찾아볼 수 없는 방식으로 Postgres의 진가를 발휘하는 부분이 바로 이 부분입니다.](https://wiki.postgresql.org/wiki/Extensions) [AGE](https://age.apache.org/)는 그래프 데이터 구조와 Cypher 쿼리 언어 사용, [TimescaleDB](https://docs.timescale.com/self-hosted/latest/)는 시계열 워크로드 지원, [Hydra Columnar](https://github.com/hydradatabase/hydra/tree/main/columnar)는 대체 열형 스토리지 엔진 제공 등 원하는 거의 모든 확장 기능이 있습니다. 직접 사용해 보고 싶으시다면 비교적 최근에 확장 프로그램 작성에 관한 [글을 작성했습니다.](https://matt.blwt.io/post/building-a-postgresql-extension-line-by-line)

Postgres shines as a great “default” database for that reason, and we’re seeing even more non-Postgres services rely on the [Postgres wire protocol](https://www.postgresql.org/docs/current/protocol.html) as a general-purpose Layer 7 protocol to provide client compatibility. With a rich ecosystem, sensible default behaviour and that it can even be fit into a [Wasm install](https://pglite.dev/) makes it a database worth understanding.
이러한 이유로 Postgres는 훌륭한 '기본' 데이터베이스로서 빛을 발하고 있으며, 클라이언트 호환성을 제공하기 위해 범용 레이어 7 프로토콜인 [Postgres 와이어 프로토콜](https://www.postgresql.org/docs/current/protocol.html)에 의존하는 비 Postgres 서비스가 훨씬 더 많아지고 있습니다. 풍부한 에코시스템, 합리적인 기본 동작, 그리고 [Wasm 설치](https://pglite.dev/)에도 적합할 수 있다는 점은 이 데이터베이스를 이해할 가치가 있는 데이터베이스입니다.

Spend a week learning about whats possible with Postgres, but also some of its limitations - [MVCC](https://www.geeksforgeeks.org/multiversion-concurrency-control-mvcc-in-postgresql/) can be fickle. Implement a simple CRUD app in your favourite language. Maybe even build a Postgres extension.
일주일 동안 Postgres의 가능성과 한계에 대해 알아보세요 - [MVCC](https://www.geeksforgeeks.org/multiversion-concurrency-control-mvcc-in-postgresql/)는 변덕스러울 수 있습니다. 원하는 언어로 간단한 CRUD 앱을 구현해 보세요. Postgres 확장 프로그램을 구축할 수도 있습니다.

## 2\. SQLite

### The Local-First Database 로컬 우선 데이터베이스

Moving on from a client-server model, we take a detour into “embedded” databases, starting with [SQLite](https://www.sqlite.org/index.html). I’ve termed this the “[local-first](https://www.inkandswitch.com/local-first/)” database, where the SQLite database is directly co-located with the application. One of the more famous examples of this usage is [WhatsApp](https://www.whatsapp.com/), which stored chats as local SQLite databases on the device being used. [Signal](https://signal.org/) also does the same thing.
클라이언트-서버 모델에서 벗어나 [SQLite](https://www.sqlite.org/index.html)로 시작하는 "임베디드" 데이터베이스로 우회합니다. 저는 이를 "[로컬 우선](https://www.inkandswitch.com/local-first/)" 데이터베이스라고 부르는데, SQLite 데이터베이스가 애플리케이션과 직접 함께 위치하는 데이터베이스입니다. 이 사용법의 가장 유명한 예 중 하나는 사용 중인 디바이스에 로컬 SQLite 데이터베이스로 채팅을 저장한 [WhatsApp](https://www.whatsapp.com/)입니다. [Signal](https://signal.org/)도 같은 기능을 수행합니다.

Beyond that, we’re starting to see more creative uses of SQLite rather than “just” a local ACID-compliant database. With the advent of tools like [Litestream](https://litestream.io/) enabling streaming backups and [LiteFS](https://fly.io/docs/litefs/) to provide distributed access, we can devise more interesting topologies. Extensions like [CR-SQLite](https://github.com/vlcn-io/cr-sqlite) allow the use of [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) to avoid needing conflict resolution when merging changesets, as used in [Corrosion](https://github.com/superfly/corrosion).
그 외에도, 로컬 ACID 호환 데이터베이스가 아닌 SQLite를 "단순히" 사용하는 것보다 더 창의적으로 활용하는 사례가 많아지고 있습니다. 스트리밍 백업을 지원하는 [Litestream](https://litestream.io/)과 분산 액세스를 제공하는 [LiteFS와 같은 도구의 등장으로 더 흥미로운 토폴로지를 고안할 수 있게 되었습니다.](https://fly.io/docs/litefs/) [CR-SQLite](https://github.com/vlcn-io/cr-sqlite)와 같은 확장을 사용하면 [CRDT를 사용하여 변경 집합 병합 시 충돌 해결이 필요하지 않도록](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) [Corrosion](https://github.com/superfly/corrosion)에서 사용되는 것처럼 할 수 있습니다.

SQLite has also had a small resurgence thanks to [Ruby on Rails 8.0](https://rubyonrails.org/2024/9/27/rails-8-beta1-no-paas-required) - 37signals has gone all in on SQLite, building a bunch of Rails modules like [Solid Queue](https://github.com/rails/solid_queue) and configuring Rails to manipulate multiple SQLite databases via `database.yml` for this purpose. [Bluesky uses SQLite for the Personal Data Servers](https://newsletter.pragmaticengineer.com/p/bluesky?open=false#%C2%A7sqlite) - every user has their own SQLite database.
SQLite는 또한 [Ruby on Rails 8.0](https://rubyonrails.org/2024/9/27/rails-8-beta1-no-paas-required) 덕분에 조금씩 부활했습니다. 37signals는 SQLite에 올인하여 [Solid Queue](https://github.com/rails/solid_queue)와 같은 여러 Rails 모듈을 구축하고 이를 위해 `database.yml`를 통해 여러 SQLite 데이터베이스를 조작하도록 Rails를 구성하고 있습니다. [Bluesky는 개인 데이터 서버에 SQLite를 사용합니다](https://newsletter.pragmaticengineer.com/p/bluesky?open=false#%C2%A7sqlite) - 모든 사용자는 자신의 SQLite 데이터베이스를 가지고 있습니다.

Spend a week experimenting with local-first architectures using SQLite, or even seeing if you can migrate a client-server model using Postgres to something that “just” needs SQLite instead.
일주일 동안 SQLite를 사용하여 로컬 우선 아키텍처를 실험해 보거나 Postgres를 사용하는 클라이언트-서버 모델을 SQLite가 '단지' 필요한 다른 아키텍처로 마이그레이션할 수 있는지 알아보세요.

## 3\. DuckDB

### The Query-Anything Database

쿼리-애니웨어 데이터베이스

Onto the next embedded database, we have [DuckDB](https://duckdb.org/). Much like SQLite, DuckDB is intended to be an in-process database system, but more focused on online analytical processing (OLAP) versus online transaction processing (OLTP).
다음 임베디드 데이터베이스로는 [DuckDB](https://duckdb.org/)가 있습니다. SQLite와 마찬가지로 DuckDB는 인프로세스 데이터베이스 시스템으로 설계되었지만 온라인 트랜잭션 처리(OLTP)보다는 온라인 분석 처리(OLAP)에 더 중점을 두고 있습니다.

Where DuckDB shines is its use as a “query-anything” database, using SQL as its dialect of choice. It can natively pull data into its engine from CSVs, TSVs, JSON etc, but also formats like Parquet - just check out the list of [data sources](https://duckdb.org/docs/data/data_sources.html). This gives it extreme flexibility - check out [this example of querying the Bluesky firehose](https://motherduck.com/blog/how-to-extract-analytics-from-bluesky/).
DuckDB의 강점은 SQL을 사용하는 '무엇이든 쿼리할 수 있는' 데이터베이스로서의 활용입니다. 기본적으로 CSV, TSV, JSON 등의 데이터를 엔진으로 가져올 수 있을 뿐만 아니라 Parquet과 같은 형식도 지원합니다([데이터 소스](https://duckdb.org/docs/data/data_sources.html) 목록을 확인하세요). [Bluesky 소방호스를 쿼리하는 예제](https://motherduck.com/blog/how-to-extract-analytics-from-bluesky/)에서 매우 유연하게 사용할 수 있습니다.

Much like Postgres, DuckDB also [has extensions](https://duckdb.org/docs/extensions/overview), though not quite as rich an ecosystem - DuckDB is much younger, after all. Many contributed by the community can be found on the [list of community extensions](https://duckdb.org/community_extensions/list_of_extensions), though a particular favourite of mine is [`gsheets`](https://duckdb.org/community_extensions/extensions/gsheets.html).
Postgres와 마찬가지로 DuckDB에도 [확장 기능이 있지만, 생태계가 그다지 풍부하지는 않습니다(결국 DuckDB는 훨씬 더 젊습니다). 커뮤니티에서 기여한 많은 확장 프로그램은](https://duckdb.org/docs/extensions/overview) [커뮤니티 확장 프로그램 목록](https://duckdb.org/community_extensions/list_of_extensions)에서 찾을 수 있지만, 제가 특히 좋아하는 것은 [`gsheets`](https://duckdb.org/community_extensions/extensions/gsheets.html)입니다.

Spend a week doing some data analysis and processing with DuckDB - be it via a Python notebook or something like [Evidence](https://evidence.dev/), maybe even see how it fits in with your “local-first” approach with SQLite by offloading analytics queries of your SQLite database to DuckDB, which [can read it](https://duckdb.org/docs/guides/database_integration/sqlite.html).
Python 노트북이나 [Evidence](https://evidence.dev/)와 같은 것을 통해 일주일 동안 DuckDB로 데이터 분석 및 처리를 해보고, SQLite 데이터베이스의 분석 쿼리를 [이것을 읽을 수 있는 DuckDB로 오프로드하여 SQLite의 "로컬 우선" 접근 방식에 어떻게 부합하는지 확인해 볼 수도 있겠죠.](https://duckdb.org/docs/guides/database_integration/sqlite.html)

## 4\. ClickHouse

### The Columnar Database 컬럼 데이터베이스

Leaving the embedded database sphere, but sticking with the analytics theme, we come to [ClickHouse](https://clickhouse.com/). If I had to only pick two databases to deal with, I’d be quite happy with just Postgres and ClickHouse - the former for OLTP, the latter for OLAP.
임베디드 데이터베이스 영역에서 벗어나 분석 테마로 돌아가서 [ClickHouse](https://clickhouse.com/)에 도달했습니다. 처리할 데이터베이스를 두 개만 선택해야 한다면, 전자는 OLTP용으로, 후자는 OLAP용으로 Postgres와 ClickHouse만 사용해도 만족할 것입니다.

ClickHouse specialises in analytics workloads, and can support very high ingest rates through [horizontal scaling](https://clickhouse.com/docs/en/architecture/horizontal-scaling) and sharded storage. It also supports [tiered storage](https://clickhouse.com/docs/en/guides/separation-storage-compute), allowing you to split “hot” and “cold” data - [GitLab](https://docs.gitlab.com/ee/development/database/clickhouse/tiered_storage.html) have a pretty thorough doc on this.
ClickHouse는 분석 워크로드에 특화되어 있으며, [수평 확장](https://clickhouse.com/docs/en/architecture/horizontal-scaling) 및 샤드 스토리지를 통해 매우 빠른 수집 속도를 지원할 수 있습니다. 또한 [계층형 스토리지를 지원하여 "핫" 데이터와 "콜드" 데이터를 분할할 수 있습니다.](https://clickhouse.com/docs/en/guides/separation-storage-compute) [GitLab](https://docs.gitlab.com/ee/development/database/clickhouse/tiered_storage.html)에 이에 대한 자세한 문서가 있습니다.

Where ClickHouse comes into its own is when you have analytics queries to run on a dataset too big for something like DuckDB, or you need “real-time” analytics. There is a lot of “benchmarketing” around these datasets, so I’m not going to repeat them here.
ClickHouse의 진가를 발휘하는 곳은 DuckDB와 같이 너무 큰 데이터 세트에서 분석 쿼리를 실행해야 하거나 '실시간' 분석이 필요한 경우입니다. 이러한 데이터 세트에 대한 '벤치마킹'은 많이 있으므로 여기서는 반복하지 않겠습니다.

Another reason I suggest checking out ClickHouse is that it is a *joy* to operate - deployment, scaling, backups and so on are [well documented](https://clickhouse.com/docs/en/architecture/cluster-deployment) - even down to setting [the right CPU governor](https://clickhouse.com/docs/en/operations/tips) is covered.
ClickHouse를 추천하는 또 다른 이유는 배포, 확장, 백업 등이 [잘 문서화되어 있으며](https://clickhouse.com/docs/en/architecture/cluster-deployment) [올바른 CPU 거버너 설정까지 다루고 있어 운영이 *즐기기 때문이기도 합니다.*](https://clickhouse.com/docs/en/operations/tips)

Spend a week exploring some larger analytics datasets, or converting some of the DuckDB analytics from above into a ClickHouse deployment. ClickHouse also has an embedded version - [chDB](https://clickhouse.com/docs/en/chdb) - that can offer a more direct comparison.
일주일 동안 좀 더 큰 분석 데이터 세트를 탐색하거나 위의 DuckDB 분석 중 일부를 ClickHouse 배포로 변환해 보세요. ClickHouse에는 보다 직접적인 비교를 제공하는 임베디드 버전인 [chDB](https://clickhouse.com/docs/en/chdb)도 있습니다.

## 5\. FoundationDB

### The Layered Database 계층화된 데이터베이스

We now enter the “mind expanding” section of this list, with [FoundationDB](https://www.foundationdb.org/). Arguably, FoundationDB is not a database, but quite literally the foundation for *a* database. Used in production by Apple, Snowflake and [Tigris Data](https://www.tigrisdata.com/blog/building-a-database-using-foundationdb/), FoundationDB is worth your time because it is quite unique in the world of key-value storage.
이제 이 목록의 "마음 확장" 섹션으로 들어가서 [FoundationDB](https://www.foundationdb.org/)로 들어갑니다. 틀림없이 FoundationDB는 데이터베이스가 아니라 말 그대로 *a* 데이터베이스의 기초라고 할 수 있습니다. Apple, Snowflake 및 [Tigris Data](https://www.tigrisdata.com/blog/building-a-database-using-foundationdb/)에서 사용하는 FoundationDB는 키-값 저장소의 세계에서 매우 독특하기 때문에 시간을 투자할 가치가 있습니다.

Yes, it’s an ordered key-value store, but that isn’t what is interesting about it. At first glance, it has some curious [limitations](https://apple.github.io/foundationdb/known-limitations.html) - transactions cannot exceed 10MB of affected data and they cannot take longer than five seconds after the first read in a transaction. But, as they say, limits set us free. By having these limits, it can achieve full ACID transactions at very large scale - 100+ TiB clusters are known to be in operation.
예, 정렬된 키-값 저장소이지만 흥미로운 것은 그 점이 아닙니다. 언뜻 보기에는 트랜잭션이 영향을 받는 데이터의 용량이 10MB를 초과할 수 없고 트랜잭션에서 처음 읽은 후 5초 이상 걸릴 수 없다는 흥미로운 [제한이 있습니다. 하지만 제한이 우리를 자유롭게 해준다는 말이 있듯이, 제한은 우리를 자유롭게 합니다. 이러한 제한이 있기 때문에 100TiB 이상의 클러스터가 운영되고 있는 것으로 알려진 매우 큰 규모의 전체 ACID 트랜잭션을 달성할 수 있습니다.](https://apple.github.io/foundationdb/known-limitations.html)

FoundationDB is architected for specific workloads and [extensively tested](https://apple.github.io/foundationdb/testing.html) using simulation testing, which has been picked up by other technologies, including another database on this list and [Antithesis](https://www.antithesis.com/), founded by some ex-FoundationDB folks. For more notes on this, check out [Tyler Neely’s](https://sled.rs/simulation.html) and [Phil Eaton’s](https://notes.eatonphil.com/2024-08-20-deterministic-simulation-testing.html) notes on the topic.
FoundationDB는 특정 워크로드에 맞게 설계되었으며 시뮬레이션 테스트를 통해 [확장 테스트를 거쳤으며, 이 목록의 다른 데이터베이스와 일부 전 FoundationDB 직원들이 설립한](https://apple.github.io/foundationdb/testing.html) [Antithesis 등 다른 기술에서 채택한 기술도 이 목록에 포함되어 있습니다. 이에 대한 자세한 내용은](https://www.antithesis.com/) [Tyler Neely's](https://sled.rs/simulation.html)와 [Phil Eaton의 해당 주제에 대한 메모를 참조하세요.](https://notes.eatonphil.com/2024-08-20-deterministic-simulation-testing.html)

As mentioned, FoundationDB has some very specific semantics that take some getting used to - their [Anti-Features](https://apple.github.io/foundationdb/anti-features.html) and [Features](https://apple.github.io/foundationdb/features.html) docs are worth familiarising yourself with to understand the problems they are looking to solve.
앞서 언급했듯이 FoundationDB에는 익숙해지는 데 시간이 걸리는 매우 구체적인 의미론이 있습니다. 해결하고자 하는 문제를 이해하려면 [기능 방지](https://apple.github.io/foundationdb/anti-features.html) 및 [기능](https://apple.github.io/foundationdb/features.html) 문서를 숙지해 두는 것이 좋습니다.

But why is it the “layered” database? This is because of the [Layers concept](https://apple.github.io/foundationdb/layer-concept.html). Instead of tying the storage engine to the data model, instead the storage is flexible enough to be remapped across different layers. [Tigris Data](https://www.tigrisdata.com/blog/data-layer-foundationdb/) have a great post about building such a layer, and there are some examples such as a [Record layer](https://github.com/FoundationDB/fdb-record-layer) and a [Document layer](https://github.com/FoundationDB/fdb-document-layer) from the FoundationDB org.
그렇다면 왜 "계층형" 데이터베이스일까요? 이는 [레이어 개념 때문입니다. 스토리지 엔진을 데이터 모델에 묶는 대신 스토리지를 여러 레이어에 걸쳐 리매핑할 수 있을 만큼 유연합니다.](https://apple.github.io/foundationdb/layer-concept.html) [Tigris Data](https://www.tigrisdata.com/blog/data-layer-foundationdb/)에는 이러한 레이어 구축에 대한 훌륭한 게시물이 있으며, FoundationDB 조직에서 [Record 레이어](https://github.com/FoundationDB/fdb-record-layer) 및 [Document 레이어](https://github.com/FoundationDB/fdb-document-layer) 같은 몇 가지 예가 있습니다.

Spend a week going through the [tutorials](https://apple.github.io/foundationdb/tutorials.html) and think about how you could use FoundationDB in place of something like [RocksDB](https://rocksdb.org/). Maybe check out some of the [Design Recipes](https://apple.github.io/foundationdb/design-recipes.html) and go read the [paper](https://www.foundationdb.org/files/fdb-paper.pdf).
일주일 동안 [튜토리얼](https://apple.github.io/foundationdb/tutorials.html)을 살펴보고 [RocksDB](https://rocksdb.org/) 같은 것 대신 FoundationDB를 어떻게 사용할 수 있을지 생각해 보세요. [디자인 레시피](https://apple.github.io/foundationdb/design-recipes.html) 중 일부를 확인하고 [논문](https://www.foundationdb.org/files/fdb-paper.pdf)을 읽어보세요.

## 6\. TigerBeetle 6\. 타이거 비틀

### The Obsessively Correct Database

강박적으로 정확한 데이터베이스

Flowing on from the deterministic simulation testing, [TigerBeetle](https://tigerbeetle.com/) breaks the mold from our previous databases in that it is decidedly *not* a general purpose database - it is entirely dedicated to financial transactions.
결정론적 시뮬레이션 테스트에 이어서, [TigerBeetle](https://tigerbeetle.com/)는 범용 데이터베이스가 아닌 전적으로 금융 거래 전용이라는 점에서 이전 데이터베이스의 틀을 깨고 있습니다.

Why is this worth a look? Single-purpose databases are unusual, and one that is as *obsessively correct* as TigerBeetle are a true rarity, especially considering it is open source. They include everything from [NASA’s Power of Ten Rules](https://en.wikipedia.org/wiki/The_Power_of_10:_Rules_for_Developing_Safety-Critical_Code) and [Protocol-Aware Recovery](https://www.usenix.org/conference/fast18/presentation/alagappan), through to strict serialisability and Direct I/O to avoid issues with the kernel page cache. It is *seriously* impressive - just go read their [Safety doc](https://github.com/tigerbeetle/tigerbeetle/blob/a43f2205f5335cb8f56d6e8bfcc6b2d99a4fc4a4/docs/about/safety.md) and their [approach to programming they call Tiger Style](https://github.com/tigerbeetle/tigerbeetle/blob/a43f2205f5335cb8f56d6e8bfcc6b2d99a4fc4a4/docs/TIGER_STYLE.md).
왜 주목할 만한 가치가 있을까요? 단일 목적 데이터베이스는 드물며, 특히 오픈 소스인 점을 감안하면 TigerBeetle처럼 *강박적으로 정확한 데이터베이스는 정말 드뭅니다. 여기에는 [NASA의 10가지 규칙](https://en.wikipedia.org/wiki/The_Power_of_10:_Rules_for_Developing_Safety-Critical_Code)과 [프로토콜 인식 복구](https://www.usenix.org/conference/fast18/presentation/alagappan)부터 엄격한 직렬화 가능성 및 커널 페이지 캐시 문제를 방지하기 위한 직접 I/O에 이르기까지 모든 것이 포함됩니다. *진짜로* 인상적입니다. [안전 문서](https://github.com/tigerbeetle/tigerbeetle/blob/a43f2205f5335cb8f56d6e8bfcc6b2d99a4fc4a4/docs/about/safety.md)와 [타이거 스타일이라고 부르는 프로그래밍 접근 방식](https://github.com/tigerbeetle/tigerbeetle/blob/a43f2205f5335cb8f56d6e8bfcc6b2d99a4fc4a4/docs/TIGER_STYLE.md)도 읽어보세요.*

Another interesting point about TigerBeetle is that it’s written in [Zig](https://ziglang.org/) - a relative newcomer to the systems programming language school, but clearly has fit well with what the TigerBeetle folks are trying to accomplish.
타이거비틀의 또 다른 흥미로운 점은 시스템 프로그래밍 언어 중에서는 비교적 새로운 언어인 [Zig](https://ziglang.org/)로 작성되었지만 타이거비틀이 추구하는 목표와 잘 맞았다는 점입니다.

Spend a week modelling your financial accounts in a local deployment of TigerBeetle - follow the [Quick Start](https://docs.tigerbeetle.com/quick-start) and take a look at the [System Architecture](https://docs.tigerbeetle.com/coding/system-architecture) docs on how you might use it in conjunction with one of the more general-purpose databases above.
[퀵 스타트](https://docs.tigerbeetle.com/quick-start)에 따라 일주일 동안 TigerBeetle의 로컬 배포에서 재무 계정을 모델링하고, 위의 범용 데이터베이스 중 하나와 함께 사용하는 방법에 대한 [시스템 아키텍처](https://docs.tigerbeetle.com/coding/system-architecture) 문서를 살펴보세요.

## 7\. CockroachDB 7\. 바퀴벌레DB

### The Global Database 글로벌 데이터베이스

Finally, we come full circle. I struggled a little on what to put here in the last slot. Thoughts originally went to [Valkey](https://valkey.io/), but FoundationDB scratched the key-value itch. I thought about graph databases, or something like [ScyllaDB](https://www.scylladb.com/) or [Cassandra](https://cassandra.apache.org/_/index.html). I thought about [DynamoDB](https://aws.amazon.com/dynamodb/), but not being able to run it locally/for free put me off.
드디어 모든 것이 완성되었습니다. 마지막 슬롯에 무엇을 넣을지 조금 고민했습니다. 원래는 [Valkey](https://valkey.io/)로 생각했지만, FoundationDB가 키-값 가려움증을 긁어주었습니다. 그래프 데이터베이스나 [ScyllaDB](https://www.scylladb.com/) 또는 [Cassandra](https://cassandra.apache.org/_/index.html) 같은 것도 생각해 보았습니다. [DynamoDB](https://aws.amazon.com/dynamodb/)도 생각해 보았지만 로컬에서 무료로 실행할 수 없다는 점이 저를 미루게 만들었습니다.

In the end, I decided to close on a globally distributed database - [CockroachDB](https://www.cockroachlabs.com/). It’s Postgres wire-protocol compatible, and inherits some of the more interesting features discussed above - large horizontal scaling, strong consistency - and has some interesting features of its own.
결국 저는 전 세계에 분산된 데이터베이스인 [CockroachDB를 사용하기로 결정했습니다. 이 데이터베이스는 Postgres 와이어 프로토콜과 호환되며, 위에서 설명한 몇 가지 흥미로운 기능(대규모 수평 확장, 강력한 일관성)을 계승하고 자체적으로 몇 가지 흥미로운 기능을 갖추고 있습니다.](https://www.cockroachlabs.com/)

CockroachDB enables scaling a database across multiple geographies through being based on Google’s [Spanner](http://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf) system, which relies on atomic and GPS clocks for extremely accurate time synchronisation. Commodity hardware, however, doesn’t have such luxuries, so CockroachDB has some [clever solutions](https://www.cockroachlabs.com/blog/living-without-atomic-clocks/#How-does-CockroachDB-choose-transaction-timestamps?) where reads are retried or delayed to account for clock sync delay with NTP, and nodes also compare clock drift amongst themselves and terminate members if they exceed the maximum offset.
CockroachDB는 매우 정확한 시간 동기화를 위해 원자 시계와 GPS 시계에 의존하는 Google의 [Spanner](http://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf) 시스템을 기반으로 하기 때문에 여러 지역에 걸쳐 데이터베이스를 확장할 수 있습니다. 그러나 상용 하드웨어에는 이러한 사치스러운 기능이 없기 때문에, CockroachDB에는 NTP와의 시계 동기화 지연을 고려하여 읽기를 다시 시도하거나 지연시키고, 노드 간에 시계 드리프트를 비교하여 최대 오프셋을 초과하면 멤버를 종료하는 몇 가지 [영리한 솔루션이 있습니다.](https://www.cockroachlabs.com/blog/living-without-atomic-clocks/#How-does-CockroachDB-choose-transaction-timestamps?)

Another interesting feature of CockroachDB is how [multi-region configurations](https://www.cockroachlabs.com/docs/stable/multiregion-overview) are used, including [table localities](https://www.cockroachlabs.com/docs/stable/table-localities), where there are different options depending on the read/write tradeoffs you want to make.
CockroachDB의 또 다른 흥미로운 기능은 [다중 지역 구성](https://www.cockroachlabs.com/docs/stable/multiregion-overview)이 사용되는 방식인데, [테이블 지역](https://www.cockroachlabs.com/docs/stable/table-localities)에는 읽기/쓰기 절충에 따라 다양한 옵션이 있습니다.

Spend a week re-implementing the the [`movr`](https://www.cockroachlabs.com/docs/v24.3/movr) example in a language and framework of your choice.
일주일 동안 원하는 언어와 프레임워크로 [`movr`](https://www.cockroachlabs.com/docs/v24.3/movr) 예제를 다시 구현해 보세요.

## Wrap Up 마무리

We’ve explored a bunch of different databases, all used in production by some of the largest companies on the planet, and hopefully this will have exposed you to some technologies you weren’t familiar with before. Take this knowledge with you as you look to solve interesting problems.
전 세계에서 가장 큰 회사 중 일부에서 프로덕션에 사용하는 다양한 데이터베이스를 살펴봤는데, 이를 통해 이전에는 잘 몰랐던 기술을 접하게 되셨기를 바랍니다. 이 지식을 가지고 흥미로운 문제를 해결해 보세요.
